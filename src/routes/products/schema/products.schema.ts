import { createSelectSchema } from "drizzle-zod";
import { category, products } from "../../../db/schema";
import { z } from "zod";
import zodToJsonSchema from "zod-to-json-schema";
import { create } from "domain";

export const productSchema = createSelectSchema(products);
export const categorySchema = createSelectSchema(category);

export const ProductObjectSchema = z.object({
  name: z.string().nonempty(),
  description: z.string().nonempty(),
  price: z.number().min(0),
  categoryId: z.string().uuid().nullable(),
  inventory: z.number().min(0),
  imageUrl: z.string().nonempty(),
  productImages: z.array(z.string()).default([]),
  dimensions: z.string().optional(),
  material: z.string().optional(),
  customization: z.string().optional(),
  features: z.array(z.string()).default([]),
  costPrice: z.number().min(0),
  setOf10: z.number().min(0),
  setof20 : z.number().min(0),
  setof50 : z.number().min(0),
  setof100 : z.number().min(0),
  discount: z.number().min(0),
  
});

export const CategoryObjectSchema = z.object({
    name: z.string().nonempty(),
    description: z.string().nonempty(),
    imageUrl: z.string(),
})

export const ProductBodySchema = zodToJsonSchema(ProductObjectSchema);

export const CategoryBodySchema = zodToJsonSchema(CategoryObjectSchema);

export const UpdateProductSchema = zodToJsonSchema(ProductObjectSchema.partial());

export const UpdateCategorySchema = zodToJsonSchema(CategoryObjectSchema.partial());

export const ProductResponseSchema = zodToJsonSchema(ProductObjectSchema.extend({
  id: z.string().uuid(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
}));

export const CategoryResponseSchema = zodToJsonSchema(CategoryObjectSchema.extend({
  id: z.string().uuid(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
}));
