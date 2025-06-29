import { PgTransaction } from "drizzle-orm/pg-core";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { eq } from "drizzle-orm";
import { db } from "../../../db/index";
import { products, saleDetails, sales, user } from "../../../db/schema";

type DBClient = PostgresJsDatabase<any> | PgTransaction<any, any, any>;

class salesRepo {
  constructor(private dbInstance: DBClient) {}

  async createSale(data: any) {
    return await this.dbInstance.insert(sales).values(data).returning();
  }

  async getAllSales() {
    return await this.dbInstance.select().from(sales);
  }

  async getSaleById(id: string) {
    return await this.dbInstance.select().from(sales).where(eq(sales.id, id));
  }

  async CreateSaleDetails(data: any) {
    return await this.dbInstance.insert(saleDetails).values(data).returning();
  }

  async getFullSalesDetails(id: string) {
    const res = await this.dbInstance
      .select()
      .from(sales)
      .where(eq(sales.id, id))
      .leftJoin(saleDetails, eq(sales.id, saleDetails.saleId))
      .leftJoin(products, eq(saleDetails.productId, products.id))
      .leftJoin(user, eq(sales.customerId, user.id));
      
    return res;
  }
}

export function SalesRepo(dbInstance: DBClient = db) {
  return new salesRepo(dbInstance);
}
