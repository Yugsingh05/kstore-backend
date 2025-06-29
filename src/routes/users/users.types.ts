import { z } from "zod";
import { userBodyZodSchema} from "./schema/users.schema";

// Ensure userSchema is a Zod schema in users.schema.ts
export type user = z.infer<typeof userBodyZodSchema>;

