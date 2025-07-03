import { createSelectSchema } from "drizzle-zod";
import { user } from "../../../db/schema";
import { z } from "zod";
import zodToJsonSchema from "zod-to-json-schema";

export const userSchema = createSelectSchema(user);

export const userBodyZodSchema = z.object({
  id: z.string(),
  name: z.string(),
  age: z.number(),
  email: z.string().email(),
  isAdmin: z.boolean(),
  profileImage: z.string(),
});

export const userResponseSchemaObject = z.object({
  id: z.string(),
  name: z.string(),
  age: z.number(),
  email: z.string().email(),
  isAdmin: z.boolean().optional(),
  profileImage: z.string().url().optional(),
  updatedAt: z.string().datetime().optional(),
  createdAt: z.string().datetime().optional(),
})

export const userBodySchema = zodToJsonSchema(userBodyZodSchema);
export const userResponseSchema = zodToJsonSchema(userResponseSchemaObject);
export const userUpdateBody = zodToJsonSchema(userBodyZodSchema.partial());
