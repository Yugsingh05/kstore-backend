import { PgTransaction } from "drizzle-orm/pg-core";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { and, eq } from "drizzle-orm";
import { db } from "../../../db/index";
import { cart, products } from "../../../db/schema";
import { custom } from "zod";

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
      .where(and(eq(cart.id, id), eq(cart.productId, data.productId)))
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
        CartId: cart.id,
        invetory: products.inventory,
        fontStyle: cart.fontStyle,
        customizationName: cart.customizationName,
        setOf10: cart.setOf10,
        priceOf10: products.setOf10,
        setof20: cart.setof20,
        priceOf20: products.setof20,
        setof50: cart.setof50,
        priceOf50: products.setof50,
        setof100: cart.setof100,
        priceOf100: products.setof100,
      })
      .from(cart)
      .where(eq(cart.userId, id))
      .leftJoin(products, eq(cart.productId, products.id));

    return res;
  }
}

export function CartRepo(dbInstance: DBClient = db) {
  return new cart_repo(dbInstance);
}
