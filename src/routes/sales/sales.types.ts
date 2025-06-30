import { z } from "zod";
import { salesBodySchema, salesDetailsBodySchema } from "./schema/sales.schema";

export type salesType =z.infer<typeof salesBodySchema>

export type salesDetailsType = z.infer<typeof salesDetailsBodySchema>