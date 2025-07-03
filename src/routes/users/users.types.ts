import { z } from "zod";
import { userBodyZodSchema} from "./schema/users.schema";

// Ensure userSchema is a Zod schema in users.schema.ts
export type user = {
    id: string;
    name: string;
    age: number;
    email: string;
    isAdmin: boolean;
    profileImage: string;
    number: string;
    createdAt: Date;
    updatedAt: Date;
}

