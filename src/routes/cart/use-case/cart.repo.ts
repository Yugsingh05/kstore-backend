import { PgTransaction } from "drizzle-orm/pg-core";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { and, eq } from "drizzle-orm";
import { db } from "../../../db/index";
import { cart, products } from "../../../db/schema";

type DBClient = PostgresJsDatabase<any> | PgTransaction<any, any, any>;

class cart_repo {
  constructor(private dbInstance: DBClient) {}

  async AddToCart(data: any) {
    return await this.dbInstance.insert(cart).values(data).returning();
  }

  async RemoveFromCart(id: string) {
    return await this.dbInstance.delete(cart).where(eq(cart.id, id));
  }

  async UpdateCart(id: string, data: any) {
    const res = await this.dbInstance
      .update(cart)
      .set(data)
      .where(and(eq(cart.id, id),eq(cart.productId, data.productId)))
      .returning();

    return res;
  }

  async GetCart(id: string) {
    const res = await this.dbInstance
      .select({
        productId: products.id,
        productName: products.name,
        productDescription: products.description,
        productPrice: products.price,
        productImageUrl: products.imageUrl,
        quantity: cart.quantity,
        CartId : cart.id,
        invetory: products.inventory
      })
      .from(cart)
      .where(eq(cart.userId, id))
      .leftJoin(products, eq(cart.productId, products.id));

    return res
  }
}

export function CartRepo(dbInstance: DBClient = db) {
  return new cart_repo(dbInstance);
}
