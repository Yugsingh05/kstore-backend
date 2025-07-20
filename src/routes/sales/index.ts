import { FastifyInstance, FastifyRequest } from "fastify";
import {
  CancelSale,
  createSale,
  getAllSales,
  getFullSalesDetails,
  getSalesByUserId,
} from "./use-case/sales.use-case";
import {
  CreateSaleBodySchema,
  salesResponseSchema,
} from "./schema/sales.schema";

async function salesRoute(fastify: FastifyInstance) {
  // GET all sales with optional filters
  fastify.get("/",{
   schema: {
      tags: ["sales"],
      description: "Get a specific sale by ID",
      response:{
        200:{
          type : 'array',
        items: salesResponseSchema
        }
      }

    }
    
  }, async (request, reply) => {
    // const { page = 1, limit = 10, userId, status, startDate, endDate } = request.query;
    const result = await getAllSales();
    return result;
  });

  // GET sale by ID with full details
  fastify.get("/:id", {
    schema: {
      tags: ["sales"],
      description: "Get a specific sale by ID",
      params: {
        type: "object",
        required: ["id"],
        properties: {
          id: { type: "string", format: "uuid" },
        },
      },
     
    },
    handler: async (
      request: FastifyRequest<{ Params: { id: string } }>,
      reply
    ) => {
      const { id } = request.params;
      const sale = await getFullSalesDetails(id);
      if (!sale) {
        reply.code(404);
        throw new Error("Sale not found");
      }
      return sale
    },
  });

  fastify.post("/", {
    schema: {
      tags: ["sales"],
      description: "Create a new sale",
      body: CreateSaleBodySchema,
    },
    handler: async (request, reply) => {
      const saleData = request.body as any;

      console.log("saleData", saleData);

      const result = await createSale(saleData);
      reply.code(201);
      return result;
    },
  })


  fastify.get("/sales-by-user/:id", {
    schema: {
      tags: ["sales"],
      description: "Get all sales",
      params: {
        type: "object",
        required: ["id"],
        properties: {
          id: { type: "string" },
        },
      },
      // response: {
      //   200: {
      //     type: "array",
      //     items: salesResponseSchema,
      //   },
      // },
    },
    handler: async (request : FastifyRequest<{Params: {id : string}}>, reply) => {
      const id = request.params.id
      const sales = await getSalesByUserId(id);
      return sales;
    },
  });


  fastify.patch("cancel-sale/:id", {
    schema: {
      tags: ["sales"],
      description: "Update a sale by ID",
      params: {
        type: "object",
        required: ["id"],
        properties: {
          id: { type: "string", format: "uuid" },
        },
      },
     
    },
    handler: async (
      request: FastifyRequest<{ Params: { id: string }}>,
      reply
    ) => {
      const { id } = request.params;

      const result = await CancelSale(id);
      reply.code(201);
      return result;
    },
  });
}

export default salesRoute;
