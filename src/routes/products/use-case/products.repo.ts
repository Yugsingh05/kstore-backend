import { PgTransaction } from "drizzle-orm/pg-core";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { eq } from "drizzle-orm";
import { db } from "../../../db/index";
import { category, products } from "../../../db/schema";
import { CategoryType, ProductType } from "../products.types";

type DBClient = PostgresJsDatabase<any> | PgTransaction<any, any, any>;

class catalogRepo {
  constructor(private dbInstance: DBClient) {}

  async createCategory(data: CategoryType) {
    return await this.dbInstance.insert(category).values(data).returning();
  }

  async getAllCategories() {
    return await this.dbInstance.select().from(category);
  }

async getCategoryById(id: string) {
  const result = await this.dbInstance
    .select()
    .from(category)
    .where(eq(category.id, id))
    .leftJoin(products, eq(category.id, products.categoryId));

  if (result.length === 0) return null;

  const { category: catData } = result[0];

  const productList = result
    .filter(row => row.products !== null)
    .map(row => row.products);

  return {
    ...catData,
    products: productList,
  };
}

  async deleteCategory(id: string) {
    return await this.dbInstance.delete(category).where(eq(category.id, id));
  }

  async updateCategory(id: string, data: CategoryType) {
    return await this.dbInstance
      .update(category)
      .set(data)
      .where(eq(category.id, id))
      .returning();
  }

  async createProduct(data: ProductType) {
    return await this.dbInstance.insert(products).values(data).returning();
  }

  async getAllProducts() {
    return await this.dbInstance.select().from(products);
  }

  async getProductById(id: string) {
    return await this.dbInstance
      .select()
      .from(products)
      .where(eq(products.id, id));
  }

  async deleteProduct(id: string) {
    return await this.dbInstance.delete(products).where(eq(products.id, id));
  }

  async updateProduct(id: string, data: ProductType) {
    return await this.dbInstance
      .update(products)
      .set(data)
      .where(eq(products.id, id))
      .returning();
  }
}

export function CataLogRepo(dbInstance: DBClient = db) {
  return new catalogRepo(dbInstance);
}
