import { z } from "zod";
import zodToJsonSchema from "zod-to-json-schema";

export const cartSchema = z.object({
  userId: z.string().nonempty(),
  productId: z.string().uuid().nonempty(),
  quantity: z.number().min(1).default(1),
});

export const cartResponseSchema = z.object({
  id: z.string(),
  userId: z.string().nonempty(),
  productId: z.string().uuid().nonempty(),
  quantity: z.number().min(1).default(1),
  fontStyle: z.string().optional(),
  customizationName: z.string().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const cartBodySchema = zodToJsonSchema(cartSchema);

export const cartResponseSchemaObject = zodToJsonSchema(cartResponseSchema);

export const cartUpdateProduct = zodToJsonSchema(cartSchema.partial());

export const LikeBodySchema = zodToJsonSchema(
  cartSchema.omit({
    quantity: true,
  })
);

export const LikeResponseSchema = zodToJsonSchema(
  cartResponseSchema.omit({
    quantity: true,
  })
);
