import { createSelectSchema } from "drizzle-zod";
import { saleDetails, sales } from "../../../db/schema";
import { z } from "zod";
import zodToJsonSchema from "zod-to-json-schema";

export const SalesSchema = createSelectSchema(sales);
export const salesDetailsSchema = createSelectSchema(saleDetails);

export const salesBodySchema = z.object({
  customerId: z.string(),
  totalItems: z.number().min(0).default(0),
  totalAmount: z.number().min(0).default(0),
  discountAmount: z.number().min(0).default(0),
  shippingCharges: z.number().min(0).default(0),
  paymentMethod: z.string().min(1).default("CASH"),
  salesStatus: z
    .enum(["PENDING", "COMPLETED", "CANCELLED", "REFUNDED"])
    .default("PENDING"),
  subtotal: z.number().default(0),
  fontStyle: z.string().optional(),
});

export const salesDetailsBodySchema = z.object({
  saleId: z.string().uuid().nonempty(),
  productId: z.string().uuid().nonempty(),
  quantity: z.number().default(0),
  unitPrice: z.number().default(0),
  subtotal: z.number().default(0),
  fontStyle: z.string().optional(),
  customizationName: z.string().optional(),
  setOf10: z.number().min(0).default(0),
  setof20 : z.number().min(0).default(0),
  saleDetailsStatus: z.enum(["PENDING", "COMPLETED", "CANCELLED", "REFUNDED"]),
  setof50 : z.number().min(0).default(0),
  setof100 : z.number().min(0).default(0),
});

export const completeSaleSchema = z.object({
  sale: salesBodySchema,
  saleDetails: z.array(salesDetailsBodySchema.omit({ saleId: true })).min(1),
});

export const CreateSaleBodySchema = zodToJsonSchema(completeSaleSchema);

export const salesResponseSchema = zodToJsonSchema(
  salesBodySchema.extend({
    id: z.string(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
  })
);
export const salesDetailsResponseSchema = zodToJsonSchema(
  salesDetailsBodySchema.extend({
    id: z.string(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
  })
);
