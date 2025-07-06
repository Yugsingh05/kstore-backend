import { PgTransaction } from "drizzle-orm/pg-core";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { eq } from "drizzle-orm";
import { db } from "../../../db/index";
import { cart, likeProduct, products } from "../../../db/schema";

type DBClient = PostgresJsDatabase<any> | PgTransaction<any, any, any>;

class likeRepo{
  constructor(private dbInstance: DBClient) {}

  async AddToLike(data: any) {
    return await this.dbInstance.insert(likeProduct).values(data).returning();
  }

  async RemoveFromLike(id : string) {
    return await this.dbInstance.delete(likeProduct).where(eq(likeProduct.id, id));
  }

  async GetLike(id: string) {
    const res = await this.dbInstance.select().from(likeProduct).where(eq(likeProduct.userId, id)).leftJoin(products, eq(likeProduct.productId, products.id));

    return res.map((row) => ({
      ...row.like_product,
      product: row.products,
    }));
  } 

}


export function LikeRepo(dbInstance: DBClient = db) {
  return new likeRepo(dbInstance);
}
