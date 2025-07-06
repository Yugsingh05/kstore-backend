import { PgTransaction } from "drizzle-orm/pg-core";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { desc, eq, sql } from "drizzle-orm";
import { db } from "../../../db/index";
import { products, saleDetails, sales, user } from "../../../db/schema";
import { salesDetailsType, salesType } from "../sales.types";

type DBClient = PostgresJsDatabase<any> | PgTransaction<any, any, any>;

class salesRepo {
  constructor(private dbInstance: DBClient) {}

  async createSale(data: salesType) {
    const res = await this.dbInstance.insert(sales).values(data).returning();

    

    return res;
  }

  async getAllSales() {
    return await this.dbInstance.select().from(sales);
  }

  async getSaleById(id: string) {
    return await this.dbInstance.select().from(sales).where(eq(sales.id, id));
  }

  async CreateSaleDetails(data: salesDetailsType) {
    const res= await this.dbInstance.insert(saleDetails).values(data).returning();
    await this.dbInstance.update(products)
      .set({ inventory: sql`${products.inventory} - ${data.quantity}` })
      .where(eq(products.id, data.productId));

      return res
  }

getSalesByUserId = async (id: string) => {
  const res = await this.dbInstance
    .select()
    .from(sales)
    .where(eq(sales.customerId, id))
    .leftJoin(saleDetails, eq(sales.id, saleDetails.saleId))
    .leftJoin(products, eq(saleDetails.productId, products.id))
    .orderBy(desc(sales.createdAt));

  const salesMap: Record<string, any> = {};

  res.forEach((row) => {
    const sale = row.sales;
    const detail = row.sale_details;
    const product = row.products;

    if (!salesMap[sale.id]) {
      salesMap[sale.id] = {
        ...sale,
        saleDetails: [],
      };
    }

    if (detail && product) {
      salesMap[sale.id].saleDetails.push({
        ...detail,
        product,
      });
    }
  });

  // Return as an array
  return Object.values(salesMap);
};
 async getFullSalesDetails(id: string) {
  const res = await this.dbInstance
    .select()
    .from(sales)
    .where(eq(sales.id, id))
    .leftJoin(saleDetails, eq(sales.id, saleDetails.saleId))
    .leftJoin(products, eq(saleDetails.productId, products.id))
    .leftJoin(user, eq(sales.customerId, user.id));

  if (res.length === 0) return null;

  const { sales: saleData, users: userData } = res[0];

  const saleDetailsList = res.map(row => ({
    ...row.sale_details,
    product: row.products
  }));

  return {
    sale: saleData,
    user: userData,
    saleDetails: saleDetailsList
  };
}
}


export function SalesRepo(dbInstance: DBClient = db) {
  return new salesRepo(dbInstance);
}
