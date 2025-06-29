import { z } from "zod";
import { CategoryObjectSchema, ProductObjectSchema } from "./schema/products.schema";

export type ProductType = z.infer<typeof ProductObjectSchema>;
export type CategoryType = z.infer<typeof CategoryObjectSchema>;