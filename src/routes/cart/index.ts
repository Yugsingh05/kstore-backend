import { FastifyInstance, FastifyRequest } from "fastify";
import {
  AddtoCart,
  GetCart,
  RemoveFromCart,
  UpdateCart,
} from "./use-case/cart.use-case";
import {
  cartBodySchema,
  cartResponseSchemaObject,
  cartUpdateProduct,
} from "./schema/cart.schema";

async function cartRoutes(fastify: FastifyInstance) {
  fastify.get(
    "/:id",
    {
      schema: {
        tags: ["cart"],
        description: "Get a specific sale by ID",
        params: {
          type: "object",
          required: ["id"],
          properties: {
            id: { type: "string"},
          },
        },
        // response: {
        //   200: {
        //     type: "array",
        //     items: cartResponseSchemaObject,
        //   },
        // },
      },
    },
    async (request: FastifyRequest<{ Params: { id: string } }>, reply) => {
      // const { page = 1, limit = 10, userId, status, startDate, endDate } = request.query;

      console.log("request.params.id", request.params.id);
      const result = await GetCart(request.params.id);
      return result;
    }
  );

  fastify.post(
    "/",
    {
      schema: {
        tags: ["cart"],
        description: "Get a specific sale by ID",
        body: cartBodySchema,
        response: {
          200: cartResponseSchemaObject,
        },
      },
    },
    async (request: FastifyRequest, reply) => {
      try {
        const result = await AddtoCart(request.body);
        return result[0];
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  );

  fastify.put(
    "/:id",
    {
      schema: {
        tags: ["cart"],
        description: "Get a specific sale by ID",
           params: {
          type: "object",
          required: ["id"],
          properties: {
            id: { type: "string", format: "uuid" },
          },
        },
        body: cartUpdateProduct,
      },
    },
    async (request: FastifyRequest<{ Params: { id: string } }>, reply) => {
      const result = await UpdateCart(request.params.id, request.body);


      return result[0];
    }
  );

  fastify.delete(
    "/:id",
    {
      schema: {
        tags: ["cart"],
        description: "delete a specific cart by ID",
        params: {
          type: "object",
          required: ["id"],
          properties: {
            id: { type: "string", format: "uuid" },
          },
        },
        response: {
          200: {
            type: "object",
            properties: {
              message: { type: "string" },
              success: { type: "boolean" },
            },
          },
        },
      },
    },

    async (request: FastifyRequest<{ Params: { id: string } }>, reply) => {
      const result = await RemoveFromCart(request.params.id);

      if (!result) {
        reply.code(404);
        return {
          message: "Product not found in cart",
          success: false,
        };
      }

      return {
        message: "Product removed from cart successfully",
        success: true,
      };
    }
  );
}

export default cartRoutes;
