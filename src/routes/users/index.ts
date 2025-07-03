import { FastifyInstance } from 'fastify';
import { v4 as uuidv4 } from 'uuid';
import { createUserSchema, getUserSchema, getUsersSchema, updateUserSchema } from './http/https.schema';
import { CreateUser, DeleteUser, GetAllUsers, GetUserById, UpdateUser } from './use-case/user-case';
import { user } from './users.types';

const users = [
  {
    id: '550e8400-e29b-41d4-a716-446655440000',
    username: 'john_doe',
    email: 'john@example.com',
    firstName: 'John',
    lastName: 'Doe',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440001',
    username: 'jane_smith',
    email: 'jane@example.com',
    firstName: 'Jane',
    lastName: 'Smith',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

async function userRoute(fastify: FastifyInstance) {
  // GET / - List users
  fastify.get('/', {
    schema: getUsersSchema,
    handler: async function (request, reply) {
      const { page = 1, limit = 10 } = request.query as { page?: number; limit?: number };

      const users = await GetAllUsers()

      return {
        data: users,
        total: users.length,
        page,
        limit,
      };
    },
  });

  // GET /:id - Get user by ID
  fastify.get('/:id', {
    schema:  getUserSchema,
     handler: async function (request, reply) {
      const { id } = request.params as { id: string };

      console.log('id', id)
      
      const user = await GetUserById(id)

      if (!user) {
        reply.code(404).send({ error: 'User not found' });
        return;
      }

      return user[0];
    },
  });

  // POST / - Create new user
fastify.post('/', {
  schema: createUserSchema,
  handler: async function (request, reply) {
    try {
      console.log('Received body:', request.body);
      const newUser = await CreateUser(request.body as user); // should be an object with all fields
      console.log('newUser', newUser);
      reply.code(201).send(newUser[0]); // send the created user object
    } catch (error) {
      console.error('error', error);
      reply.code(500).send({ msg: 'Internal server error', error });
    }
  },
});

  // PUT /:id - Update user
  fastify.put('/:id', {
    schema:updateUserSchema,
    async handler(request, reply) {
     try {
       const { id } = request.params as { id: string };

       const updatedUser = await UpdateUser(id, request.body as user);

       reply.code(200).send(updatedUser[0]);
     } catch (error) {
      reply.code(500).send({ msg: 'Internal server error' , error});
     }
   
    },
  });

  // DELETE /:id - Delete user
  fastify.delete('/:id', {
    schema: {
      tags: ['users'],
      description: 'Delete a user by ID',
      params: {
        type: 'object',
        required: ['id'],
        properties: {
          id: { type: 'string', format: 'uuid' },
        },
      },
      response: {
        200:{
          type : 'object',
          properties: {
            success: { type: 'boolean' },
            msg : { type: 'string' },
            statusCode: { type: 'number' }
          }
        },
        204: {
          type: 'null',
        },
      },
    },
    async handler(request, reply) {
     try {
       const { id } = request.params as { id: string };
      
       const deletedUser = await DeleteUser(id);
 
       console.log('deletedUser', deletedUser)

       reply.code(200).send({ success: true, msg: 'User deleted successfully', statusCode: 200 });
     } catch (error) {
      reply.code(500).send({ msg: 'Internal server error' , error});
     }
    },
  });
}

export default userRoute;
