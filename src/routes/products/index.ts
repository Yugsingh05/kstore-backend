import { FastifyInstance } from "fastify";
import {
  createProductSchema,
  DeleteProductSchema,
  getProductSchema,
  getProductsSchema,
  updateProductSchema,
} from "./http/products.http.schema";
import {
  CreateProduct,
  DeleteProduct,
  GetAllProducts,
  GetProductById,
  UpdateProduct,
} from "./use-case/products.use-case";
import { ProductType } from "./products.types";

async function productRoute(fastify: FastifyInstance) {
  // GET all products
  fastify.get("/", {
    schema: getProductsSchema,
    handler: async (request, reply) => {
      try {
        const { page = 1, limit = 10, category } = request.query as {
          page?: number;
          limit?: number;
          category?: string;
        };

        const filteredProducts = await GetAllProducts();


        if(!filteredProducts) {
          reply.code(404).send({ message: "Products not found" });
          return;
        }

        return {
          data: filteredProducts,
          total: filteredProducts.length,
          page,
          limit,
        };
      } catch (err: any) {
        reply.code(500).send({
          message: "Internal Server Error",
          error: err.message,
        });
      }
    },
  });

  // GET product by ID
  fastify.get("/:id", {
    schema: getProductSchema,
    handler: async (request, reply) => {
      try {
        const { id } = request.params as { id: string };
        const product = await GetProductById(id);

        if (!product) {
          reply.code(404).send({ message: "Product not found" });
          return;
        }

        return product[0];
      } catch (err: any) {
        reply.code(500).send({
          message: "Internal Server Error",
          error: err.message,
        });
      }
    },
  });

  // POST create product
  fastify.post("/", {
    schema: createProductSchema,
    handler: async (request, reply) => {
      try {
        const body = request.body as ProductType;
        const newProduct = await CreateProduct(body);
        reply.code(201).send(newProduct[0]);
      } catch (err: any) {
        reply.code(500).send({
          message: "Internal Server Error",
          error: err.message,
        });
      }
    },
  });

  // PUT update product
  fastify.put("/:id", {
    schema: updateProductSchema,
    handler: async (request, reply) => {
      try {
        const { id } = request.params as { id: string };
        const body = request.body as ProductType;
        const updatedProduct = await UpdateProduct(id, body);
        return updatedProduct[0];
      } catch (err: any) {
        reply.code(500).send({
          message: "Internal Server Error",
          error: err.message,
        });
      }
    },
  });

  // DELETE product
  fastify.delete("/:id", {
    schema: DeleteProductSchema,
    handler: async (request, reply) => {
      try {
        const { id } = request.params as { id: string };
        const deletedProduct = await DeleteProduct(id);

        if (!deletedProduct) {
          reply.code(404).send({ message: "Product not found" });
          return;
        }

        return {
          msg: "Product deleted successfully",
          success: true,
          status: 200,
        };
      } catch (err: any) {
        reply.code(500).send({
          message: "Internal Server Error",
          error: err.message,
        });
      }
    },
  });
}

export default productRoute;
