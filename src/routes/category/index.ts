import { FastifyInstance } from "fastify";
import { CreateCategory, DeleteCategory, GetAllCategories, GetCategoryById, updateCategory } from "../products/use-case/products.use-case";
import { createCategorySchema, DeleteCategorySchema, GetCategoriesSchema, getCategorySchema, UpdateCategoryBodySchema } from "../products/http/products.http.schema";
import { CategoryType } from "../products/products.types";

async function categoryRoute(fastify: FastifyInstance) {
  // GET all products
  fastify.get("/", {
    schema: GetCategoriesSchema,
    handler: async (request, reply) => {
      try {
        const { page = 1, limit = 10 } = request.query as {
          page?: number;
          limit?: number;
        };

        const categories = await GetAllCategories();


        if(!categories) {
          reply.code(404).send({ message: "Categories not found" });
          return;
        }

        return {
          data: categories,
          total: categories.length,
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

  // GET category by ID
  fastify.get("/:id", {
    schema: getCategorySchema,
    handler: async (request, reply) => {
      try {
        const { id } = request.params as { id: string };
        const category = await GetCategoryById(id);

        if (!category) {
          reply.code(404).send({ message: "Category not found" });
          return;
        }

        return category;
      } catch (err: any) {
        reply.code(500).send({
          message: "Internal Server Error",
          error: err.message,
        });
      }
    },
  });

  // POST create category
  fastify.post("/", {
    schema: createCategorySchema,
    handler: async (request, reply) => {
      try {
        const body = request.body as CategoryType;
        const newCategory = await CreateCategory(body);
        reply.code(201).send(newCategory[0]);
      } catch (err: any) {
        reply.code(500).send({
          message: "Internal Server Error",
          error: err.message,
        });
      }
    },
  });

  // PUT update category
  fastify.put("/:id", {
    schema: UpdateCategoryBodySchema,
    handler: async (request, reply) => {
      try {
        const { id } = request.params as { id: string };
        const body = request.body as CategoryType;
        const updatedCategory = await updateCategory(id, body);
        return updatedCategory[0];
      } catch (err: any) {
        reply.code(500).send({
          message: "Internal Server Error",
          error: err.message,
        });
      }
    },
  });

  // DELETE category
  fastify.delete("/:id", {
    schema: DeleteCategorySchema,
    handler: async (request, reply) => {
      try {
        const { id } = request.params as { id: string };
        const deletedCategory = await DeleteCategory(id);

        if (!deletedCategory) {
          reply.code(404).send({ message: "Category not found" });
          return;
        }

        return {
          msg: "Category deleted successfully",
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

export default categoryRoute;
