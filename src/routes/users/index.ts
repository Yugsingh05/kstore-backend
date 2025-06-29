import { FastifyInstance } from 'fastify';
import { v4 as uuidv4 } from 'uuid';
import { createUserSchema, getUserSchema, getUsersSchema, updateUserSchema } from './http/https.schema';
import { CreateUser, GetAllUsers, GetUserById } from './use-case/user-case';
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
      
      const user = await GetUserById(id)

      if (!user) {
        reply.code(404).send({ error: 'User not found' });
        return;
      }

      return user;
    },
  });

  // POST / - Create new user
  fastify.post('/', {
    schema: createUserSchema,
     handler: async function (request, reply) {
    

      const newUser = await CreateUser(request.body as user)

      console.log('newUser', newUser)

      reply.code(201).send(newUser);
    },
  });

  // PUT /:id - Update user
  fastify.put('/:id', {
    schema:updateUserSchema,
    handler(request, reply) {
      const { id } = request.params as { id: string };
      const userIndex = users.findIndex((u) => u.id === id);

      if (userIndex === -1) {
        reply.code(404).send({ error: 'User not found' });
        return;
      }

      const updatedUser = {
        ...users[userIndex],
        ...request.body as object,
        updatedAt: new Date().toISOString(),
      };

      // Normally: update in DB
      // users[userIndex] = updatedUser;

      return updatedUser;
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
        204: {
          type: 'null',
        },
      },
    },
    async handler(request, reply) {
      const { id } = request.params as { id: string };
      const userIndex = users.findIndex((u) => u.id === id);

      if (userIndex === -1) {
        reply.code(404).send({ error: 'User not found' });
        return;
      }

      // Normally: delete from DB
      // users.splice(userIndex, 1);

      reply.code(204).send();
    },
  });
}

export default userRoute;
