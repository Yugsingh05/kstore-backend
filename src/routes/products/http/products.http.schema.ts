import zodToJsonSchema from "zod-to-json-schema";
import { CategoryBodySchema, CategoryResponseSchema, categorySchema, ProductBodySchema, ProductResponseSchema, productSchema, UpdateCategorySchema, UpdateProductSchema } from "../schema/products.schema";


export const createProductSchema = {
  tags: ["products"],
  body: ProductBodySchema,
  response: {
    201: ProductResponseSchema,
  },
};

export const getProductSchema = {
   tags: ["products"],
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "string", format: "uuid" },
    },
  },
  response: {
    200: ProductResponseSchema,
  },
};

export const updateProductSchema = {
   tags: ["products"],
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "string", format: "uuid" },
    },
  },
  body: UpdateProductSchema,
  response: {
    200: ProductResponseSchema,
  },
};

export const getProductsSchema = {
   tags: ["products"],
  querystring: {
    type: "object",
    properties: {
      page: { type: "integer", minimum: 1, default: 1 },
      limit: { type: "integer", minimum: 1, maximum: 100, default: 10 },
      category: { type: "string" },
    },
  },
  response: {
    200: {
      type: "object",
      properties: {
        data: {
          type: "array",
          items:ProductResponseSchema,
        },
        total: { type: "integer" },
        page: { type: "integer" },
        limit: { type: "integer" },
      },
      required: ["total", "page", "limit"],
    },
  },
};

export const GetCategoriesSchema = {
   tags: ["category"],
  querystring: {
    type: "object",
    properties: {
      page: { type: "integer", minimum: 1, default: 1 },
      limit: { type: "integer", minimum: 1, maximum: 100, default: 10 },
      category: { type: "string" },
    },
  },
  response: {
    200: {
      type: "object",
      properties: {
        data: {
          type: "array",
          items:CategoryResponseSchema,
        },
        total: { type: "integer" },
        page: { type: "integer" },
        limit: { type: "integer" },
      },
      required: ["total", "page", "limit"],
    },
  },
};

export const createCategorySchema = {
    tags: ["category"],
  body: CategoryBodySchema,
  response: {
    201: CategoryResponseSchema,
  },
};

export const getCategorySchema = {
    tags: ["category"],
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "string", format: "uuid" },
    },
  },
};


export const UpdateCategoryBodySchema = {
    tags: ["category"],
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "string", format: "uuid" },
    },
  },
  body: UpdateCategorySchema,
  response: {
    200: CategoryResponseSchema,
  },
};

export const DeleteCategorySchema = {
    tags: ["category"],
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "string", format: "uuid" },
    },
  },
};

export const DeleteProductSchema = {
   tags: ["products"],
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "string", format: "uuid" },
    },
  },
}