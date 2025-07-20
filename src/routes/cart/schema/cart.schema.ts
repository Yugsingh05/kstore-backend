import { z } from "zod";
import zodToJsonSchema from "zod-to-json-schema";

export const cartSchema = z.object({
  userId: z.string().nonempty(),
  productId: z.string().uuid().nonempty(),
  quantity: z.number().min(1).default(1),
  fontStyle: z.string().optional(),
  customizationName: z.string().optional(),
  setOf10: z.number().min(0).default(0),
  setof20: z.number().min(0).default(0),
  setof50: z.number().min(0).default(0),
  setof100: z.number().min(0).default(0),
});

export const cartResponseSchema = z.object({
  id: z.string(),
  userId: z.string().nonempty(),
  productId: z.string().uuid().nonempty(),
  quantity: z.number().min(1).default(1),
  fontStyle: z.string().nullable(),
  customizationName: z.string().nullable(),
  setOf10: z.number().min(0).default(0),
  setof20: z.number().min(0).default(0),
  setof50: z.number().min(0).default(0),
  setof100: z.number().min(0).default(0),
  priceOf10: z.number().min(0).default(0),
  priceof20: z.number().min(0).default(0),
  priceof50: z.number().min(0).default(0),
  priceof100: z.number().min(0).default(0),

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
    customizationName: true,
    fontStyle: true,
  })
);
