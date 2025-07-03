import {
  boolean,
  doublePrecision,
  integer,
  pgEnum,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

// Enum for sales status
export const statusEnum = pgEnum("status", [
  "PENDING",
  "COMPLETED",
  "CANCELLED",
  "REFUNDED",
]);

// Users table - using varchar for ID
export const user = pgTable("users", {
  id: varchar().primaryKey().notNull(),
  name: varchar({ length: 255 }).notNull(),
  age: integer().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  isAdmin: boolean().default(false).notNull(),
  profileImage: varchar().notNull(),
  number: varchar().notNull(),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
});

// Categories
export const category = pgTable("category", {
  id: uuid().defaultRandom().primaryKey().notNull(),
  name: varchar({ length: 255 }).notNull(),
  description: varchar({ length: 255 }).notNull(),
  imageUrl: varchar().notNull(),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
});

// Products
export const products = pgTable("products", {
  id: uuid().defaultRandom().primaryKey().notNull(),
  name: varchar({ length: 255 }).notNull(),
  description: varchar({ length: 255 }).notNull(),
  price: integer().notNull(),
  categoryId: uuid().references(() => category.id),
  inventory: integer().notNull().default(0),
  imageUrl: varchar().notNull(),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
});

// Sales
export const sales = pgTable("sales", {
  id: uuid().defaultRandom().primaryKey().notNull(),
  customerId: varchar().notNull().references(() => user.id), // ✅ using varchar
  totalItems: integer().notNull().default(0),
  totalAmount: doublePrecision().notNull().default(0),
  discountAmount: doublePrecision().notNull().default(0),
  paymentMethod: varchar({ length: 255 }).notNull(),
  Salesstatus: statusEnum("status").default("PENDING").notNull(),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
});

// Sale Details
export const saleDetails = pgTable("sale_details", {
  id: uuid().defaultRandom().primaryKey().notNull(),
  saleId: uuid().notNull().references(() => sales.id),
  productId: uuid().notNull().references(() => products.id),
  quantity: integer().notNull(),
  unitPrice: doublePrecision().notNull().default(0),
  subtotal: doublePrecision().notNull().default(0),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
});

// Cart
export const cart = pgTable("cart", {
  id: uuid().defaultRandom().primaryKey().notNull(),
  userId: varchar().notNull().references(() => user.id), // ✅ using varchar
  productId: uuid().notNull().references(() => products.id),
  quantity: integer().notNull(),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
});

// // Product Likes
export const likeProduct = pgTable("like_product", {
  id: uuid().defaultRandom().primaryKey().notNull(),
  userId: varchar().notNull().references(() => user.id), // ✅ using varchar
  productId: uuid().notNull().references(() => products.id),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
});
