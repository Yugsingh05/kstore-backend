import { FastifyInstance, FastifyRequest } from "fastify";
import { AddToLike, GetLike, RemoveFromLike } from "./use-case/like.use-case";
import { cartBodySchema, cartResponseSchema, cartResponseSchemaObject, LikeBodySchema, LikeResponseSchema } from "../cart/schema/cart.schema";

async function likeRoutes(fastify: FastifyInstance) {

 fastify.get("/:id",{
   schema: {
      params:{
        type: "object",
        required: ["id"],
        properties: {
          id: { type: "string" },
        },
      },
      // response:{
      //     200 : {
      //       type :"array",
      //       items : LikeResponseSchema
      //     }
      // }
    }
    
  }, async (request : FastifyRequest<{Params: {id : string}}>, reply) => {
    // const { page = 1, limit = 10, userId, status, startDate, endDate } = request.query;
    const result = await GetLike(request.params.id);
    return result;
  });


  fastify.post("/",{
    schema: {
      body : LikeBodySchema,
      response:{
          200 :LikeResponseSchema
      }
    },

  },async (request : FastifyRequest, reply) => {
    const result = await AddToLike(request.body);
    return result[0];
  });

   fastify.delete("/:id",{
    schema: {

      params:{
        type: "object",
        required: ["id"],
        properties: {
          id: { type: "string", format: "uuid" },
        },
      },
       response:{
           200 : {
            type : 'object',
            properties : {
              message : {type : 'string'},
              success : {type : 'boolean'}
            }
           }
       }
    },

  },async (request : FastifyRequest<{Params: {id : string}}>, reply) => {
  
    const result = await RemoveFromLike(request.params.id );
    
    if(!result) {
        reply.code(404);
      return {
        message : "Product not found in like",
        success : false
      };
    }
    
    return {
      message : "Product removed from like successfully",
      success : true
    };
  });
}

export default likeRoutes;
