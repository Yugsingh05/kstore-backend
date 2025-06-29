import { userBodySchema, userResponseSchema, userUpdateBody } from "../schema/users.schema"

export const createUserSchema = {
  tags: ['users'],
  description : 'Create a new user',
  body: userBodySchema,
  response: {
    201: userResponseSchema
  }
}

export const getUserSchema = {
   tags: ['users'],
  description : 'get user',
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'string', format: 'uuid' }
    }
  },
  response: {
    200: userResponseSchema
  }
}

 export const updateUserSchema = {
   tags: ['users'],
  description : 'update a existing user',
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'string', format: 'uuid' }
    }
  },
  body: userUpdateBody,
  response: {
    200: userResponseSchema
  }
}

export const getUsersSchema = {
   tags: ['users'],
  description : 'get users',
  querystring: {
    type: 'object',
    properties: {
      page: { type: 'integer', minimum: 1, default: 1 },
      limit: { type: 'integer', minimum: 1, maximum: 100, default: 10 }
    }
  },
  response: {
    200: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: userResponseSchema
        },
        total: { type: 'integer' },
        page: { type: 'integer' },
        limit: { type: 'integer' }
      }
    }
  }
}