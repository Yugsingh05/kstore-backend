import zodToJsonSchema from "zod-to-json-schema";
import { CategoryBodySchema, CategoryResponseSchema, categorySchema, ProductBodySchema, ProductResponseSchema, productSchema, UpdateCategorySchema, UpdateProductSchema } from "../schema/products.schema";


export const createProductSchema = {
  body: ProductBodySchema,
  response: {
    201: ProductResponseSchema,
  },
};

export const getProductSchema = {
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

export const createCategorySchema = {
  body: CategoryBodySchema,
  response: {
    201: CategoryResponseSchema,
  },
};

export const getCategorySchema = {
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "string", format: "uuid" },
    },
  },
  response: {
    200: CategoryResponseSchema,
  },
};


export const UpdateCategoryBodySchema = {
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
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "string", format: "uuid" },
    },
  },
  response: {
    200: CategoryResponseSchema,
  },
};

export const DeleteProductSchema = {
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "string", format: "uuid" },
    },
  },
}