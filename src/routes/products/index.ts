/**
 * Product routes
 */

// Product schema definitions
const productSchema = {
  type: "object",
  properties: {
    id: { type: "string", format: "uuid" },
    name: { type: "string" },
    description: { type: "string" },
    price: { type: "number", minimum: 0 },
    category: { type: "string" },
    sku: { type: "string" },
    inventory: { type: "integer", minimum: 0 },
    imageUrl: { type: "string", format: "uri" },
    createdAt: { type: "string", format: "date-time" },
    updatedAt: { type: "string", format: "date-time" },
  },
};

const createProductSchema = {
  body: {
    type: "object",
    required: ["name", "price", "category"],
    properties: {
      name: { type: "string" },
      description: { type: "string" },
      price: { type: "number", minimum: 0 },
      category: { type: "string" },
      sku: { type: "string" },
      inventory: { type: "integer", minimum: 0, default: 0 },
      imageUrl: { type: "string", format: "uri" },
    },
  },
  response: {
    201: productSchema,
  },
};

const getProductSchema = {
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "string", format: "uuid" },
    },
  },
  response: {
    200: productSchema,
  },
};

const updateProductSchema = {
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "string", format: "uuid" },
    },
  },
  body: {
    type: "object",
    properties: {
      name: { type: "string" },
      description: { type: "string" },
      price: { type: "number", minimum: 0 },
      category: { type: "string" },
      sku: { type: "string" },
      inventory: { type: "integer", minimum: 0 },
      imageUrl: { type: "string", format: "uri" },
    },
  },
  response: {
    200: productSchema,
  },
};

const getProductsSchema = {
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
          items: productSchema,
        },
        total: { type: "integer" },
        page: { type: "integer" },
        limit: { type: "integer" },
      },
    },
  },
};

// Dummy products data
const products = [
  {
    id: "550e8400-e29b-41d4-a716-446655440010",
    name: "Smartphone X",
    description: "Latest smartphone with advanced features",
    price: 999.99,
    category: "Electronics",
    sku: "PHONE-X-123",
    inventory: 50,
    imageUrl: "https://example.com/images/smartphone-x.jpg",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440011",
    name: "Wireless Headphones",
    description: "Premium noise-canceling wireless headphones",
    price: 249.99,
    category: "Electronics",
    sku: "AUDIO-HP-456",
    inventory: 30,
    imageUrl: "https://example.com/images/headphones.jpg",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440012",
    name: "Laptop Pro",
    description: "High-performance laptop for professionals",
    price: 1499.99,
    category: "Electronics",
    sku: "LAPTOP-PRO-789",
    inventory: 15,
    imageUrl: "https://example.com/images/laptop-pro.jpg",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

/**
 * Product routes plugin
 * @param {FastifyInstance} fastify
 * @param {Object} options
 */
async function productRoute(
  fastify: {
    get: (
      arg0: string,
      arg1: {
        schema:
          | {
              tags: string[];
              description: string;
              querystring: {
                type: string;
                properties: {
                  page: { type: string; minimum: number; default: number };
                  limit: {
                    type: string;
                    minimum: number;
                    maximum: number;
                    default: number;
                  };
                  category: { type: string };
                };
              };
              response: {
                200: {
                  type: string;
                  properties: {
                    data: {
                      type: string;
                      items: {
                        type: string;
                        properties: {
                          id: { type: string; format: string };
                          name: { type: string };
                          description: { type: string };
                          price: { type: string; minimum: number };
                          category: { type: string };
                          sku: { type: string };
                          inventory: { type: string; minimum: number };
                          imageUrl: { type: string; format: string };
                          createdAt: { type: string; format: string };
                          updatedAt: { type: string; format: string };
                        };
                      };
                    };
                    total: { type: string };
                    page: { type: string };
                    limit: { type: string };
                  };
                };
              };
            }
          | {
              tags: string[];
              description: string;
              params: {
                type: string;
                required: string[];
                properties: { id: { type: string; format: string } };
              };
              response: {
                200: {
                  type: string;
                  properties: {
                    id: { type: string; format: string };
                    name: { type: string };
                    description: { type: string };
                    price: { type: string; minimum: number };
                    category: { type: string };
                    sku: { type: string };
                    inventory: { type: string; minimum: number };
                    imageUrl: { type: string; format: string };
                    createdAt: { type: string; format: string };
                    updatedAt: { type: string; format: string };
                  };
                };
              };
            };
        handler:
          | ((
              request: any,
              reply: any
            ) => Promise<{
              data: {
                id: string;
                name: string;
                description: string;
                price: number;
                category: string;
                sku: string;
                inventory: number;
                imageUrl: string;
                createdAt: string;
                updatedAt: string;
              }[];
              total: number;
              page: any;
              limit: any;
            }>)
          | ((
              request: any,
              reply: any
            ) => Promise<{
              id: string;
              name: string;
              description: string;
              price: number;
              category: string;
              sku: string;
              inventory: number;
              imageUrl: string;
              createdAt: string;
              updatedAt: string;
            }>);
      }
    ) => void;
    post: (
      arg0: string,
      arg1: {
        schema: {
          tags: string[];
          description: string;
          body: {
            type: string;
            required: string[];
            properties: {
              name: { type: string };
              description: { type: string };
              price: { type: string; minimum: number };
              category: { type: string };
              sku: { type: string };
              inventory: { type: string; minimum: number; default: number };
              imageUrl: { type: string; format: string };
            };
          };
          response: {
            201: {
              type: string;
              properties: {
                id: { type: string; format: string };
                name: { type: string };
                description: { type: string };
                price: { type: string; minimum: number };
                category: { type: string };
                sku: { type: string };
                inventory: { type: string; minimum: number };
                imageUrl: { type: string; format: string };
                createdAt: { type: string; format: string };
                updatedAt: { type: string; format: string };
              };
            };
          };
        };
        handler: (request: any, reply: any) => Promise<any>;
      }
    ) => void;
    put: (
      arg0: string,
      arg1: {
        schema: {
          tags: string[];
          description: string;
          params: {
            type: string;
            required: string[];
            properties: { id: { type: string; format: string } };
          };
          body: {
            type: string;
            properties: {
              name: { type: string };
              description: { type: string };
              price: { type: string; minimum: number };
              category: { type: string };
              sku: { type: string };
              inventory: { type: string; minimum: number };
              imageUrl: { type: string; format: string };
            };
          };
          response: {
            200: {
              type: string;
              properties: {
                id: { type: string; format: string };
                name: { type: string };
                description: { type: string };
                price: { type: string; minimum: number };
                category: { type: string };
                sku: { type: string };
                inventory: { type: string; minimum: number };
                imageUrl: { type: string; format: string };
                createdAt: { type: string; format: string };
                updatedAt: { type: string; format: string };
              };
            };
          };
        };
        handler: (request: any, reply: any) => Promise<any>;
      }
    ) => void;
    delete: (
      arg0: string,
      arg1: {
        schema: {
          tags: string[];
          description: string;
          params: {
            type: string;
            required: string[];
            properties: { id: { type: string; format: string } };
          };
          response: { 204: { type: string } };
        };
        handler: (request: any, reply: any) => Promise<void>;
      }
    ) => void;
  },
  options: any
) {
  // Get all products
  fastify.get("/", {
    schema: {
      tags: ["products"],
      description: "Get all products with optional category filter",
      querystring: getProductsSchema.querystring,
      response: getProductsSchema.response,
    },
    handler: async (
      request: {
        query: { page?: 1 | undefined; limit?: 10 | undefined; category: any };
      },
      reply: any
    ) => {
      const { page = 1, limit = 10, category } = request.query;

      let filteredProducts = [...products];

      // Filter by category if provided
      if (category) {
        filteredProducts = filteredProducts.filter(
          (p) => p.category === category
        );
      }

      return {
        data: filteredProducts,
        total: filteredProducts.length,
        page: page,
        limit: limit,
      };
    },
  });

  // Get product by ID
  fastify.get("/:id", {
    schema: {
      tags: ["products"],
      description: "Get a specific product by ID",
      params: getProductSchema.params,
      response: getProductSchema.response,
    },
    handler: async (
      request: { params: { id: any } },
      reply: { code: (arg0: number) => void }
    ) => {
      const { id } = request.params;
      const product = products.find((p) => p.id === id);

      if (!product) {
        reply.code(404);
        throw new Error("Product not found");
      }

      return product;
    },
  });

  // Create new product
  fastify.post("/", {
    schema: {
      tags: ["products"],
      description: "Create a new product",
      body: createProductSchema.body,
      response: createProductSchema.response,
    },
    handler: async (
      request: { body: any },
      reply: { code: (arg0: number) => void }
    ) => {
      const newProduct = {
        id: `550e8400-e29b-41d4-a716-${Math.floor(Math.random() * 1000000)
          .toString()
          .padStart(12, "0")}`,
        ...request.body,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // In a real application, you would save to a database here
      // products.push(newProduct)

      reply.code(201);
      return newProduct;
    },
  });

  // Update product
  fastify.put("/:id", {
    schema: {
      tags: ["products"],
      description: "Update an existing product",
      params: updateProductSchema.params,
      body: updateProductSchema.body,
      response: updateProductSchema.response,
    },
    handler: async (
      request: { params: { id: any }; body: any },
      reply: { code: (arg0: number) => void }
    ) => {
      const { id } = request.params;
      const productIndex = products.findIndex((p) => p.id === id);

      if (productIndex === -1) {
        reply.code(404);
        throw new Error("Product not found");
      }

      // In a real application, you would update in a database here
      const updatedProduct = {
        ...products[productIndex],
        ...request.body,
        updatedAt: new Date().toISOString(),
      };

      return updatedProduct;
    },
  });

  // Delete product
  fastify.delete("/:id", {
    schema: {
      tags: ["products"],
      description: "Delete a product by ID",
      params: {
        type: "object",
        required: ["id"],
        properties: {
          id: { type: "string", format: "uuid" },
        },
      },
      response: {
        204: {
          type: "null",
        },
      },
    },
    handler: async (
      request: { params: { id: any } },
      reply: {
        code: (arg0: number) => {
          (): any;
          new (): any;
          send: { (): void; new (): any };
        };
      }
    ) => {
      const { id } = request.params;
      const productIndex = products.findIndex((p) => p.id === id);

      if (productIndex === -1) {
        reply.code(404);
        throw new Error("Product not found");
      }

      // In a real application, you would delete from a database here
      // products.splice(productIndex, 1)

      reply.code(204).send();
    },
  });
}

module.exports = productRoute;
