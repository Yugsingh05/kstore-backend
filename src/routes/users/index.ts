/**
 * User routes
 */

// User schema definitions
const userSchema = {
  type: 'object',
  properties: {
    id: { type: 'string', format: 'uuid' },
    username: { type: 'string', minLength: 3 },
    email: { type: 'string', format: 'email' },
    firstName: { type: 'string' },
    lastName: { type: 'string' },
    createdAt: { type: 'string', format: 'date-time' },
    updatedAt: { type: 'string', format: 'date-time' }
  }
}

const createUserSchema = {
  body: {
    type: 'object',
    required: ['username', 'email', 'password'],
    properties: {
      username: { type: 'string', minLength: 3 },
      email: { type: 'string', format: 'email' },
      password: { type: 'string', minLength: 6 },
      firstName: { type: 'string' },
      lastName: { type: 'string' }
    }
  },
  response: {
    201: userSchema
  }
}

const getUserSchema = {
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'string', format: 'uuid' }
    }
  },
  response: {
    200: userSchema
  }
}

const updateUserSchema = {
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'string', format: 'uuid' }
    }
  },
  body: {
    type: 'object',
    properties: {
      username: { type: 'string', minLength: 3 },
      email: { type: 'string', format: 'email' },
      firstName: { type: 'string' },
      lastName: { type: 'string' }
    }
  },
  response: {
    200: userSchema
  }
}

const getUsersSchema = {
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
          items: userSchema
        },
        total: { type: 'integer' },
        page: { type: 'integer' },
        limit: { type: 'integer' }
      }
    }
  }
}

// Dummy users data
const users = [
  {
    id: '550e8400-e29b-41d4-a716-446655440000',
    username: 'john_doe',
    email: 'john@example.com',
    firstName: 'John',
    lastName: 'Doe',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440001',
    username: 'jane_smith',
    email: 'jane@example.com',
    firstName: 'Jane',
    lastName: 'Smith',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
]

/**
 * User routes plugin
 * @param {FastifyInstance} fastify 
 * @param {Object} _options 
 */
async function userRoute(fastify: { get: (arg0: string, arg1: { schema: { tags: string[]; description: string; querystring: { type: string; properties: { page: { type: string; minimum: number; default: number }; limit: { type: string; minimum: number; maximum: number; default: number } } }; response: { 200: { type: string; properties: { data: { type: string; items: { type: string; properties: { id: { type: string; format: string }; username: { type: string; minLength: number }; email: { type: string; format: string }; firstName: { type: string }; lastName: { type: string }; createdAt: { type: string; format: string }; updatedAt: { type: string; format: string } } } }; total: { type: string }; page: { type: string }; limit: { type: string } } } } } | { tags: string[]; description: string; params: { type: string; required: string[]; properties: { id: { type: string; format: string } } }; response: { 200: { type: string; properties: { id: { type: string; format: string }; username: { type: string; minLength: number }; email: { type: string; format: string }; firstName: { type: string }; lastName: { type: string }; createdAt: { type: string; format: string }; updatedAt: { type: string; format: string } } } } }; handler: ((request: any, reply: any) => { data: { id: string; username: string; email: string; firstName: string; lastName: string; createdAt: string; updatedAt: string }[]; total: number; page: any; limit: any }) | ((request: any, reply: any) => { id: string; username: string; email: string; firstName: string; lastName: string; createdAt: string; updatedAt: string }) }) => void; post: (arg0: string, arg1: { schema: { tags: string[]; description: string; body: { type: string; required: string[]; properties: { username: { type: string; minLength: number }; email: { type: string; format: string }; password: { type: string; minLength: number }; firstName: { type: string }; lastName: { type: string } } }; response: { 201: { type: string; properties: { id: { type: string; format: string }; username: { type: string; minLength: number }; email: { type: string; format: string }; firstName: { type: string }; lastName: { type: string }; createdAt: { type: string; format: string }; updatedAt: { type: string; format: string } } } } }; handler: (request: any, reply: any) => any }) => void; put: (arg0: string, arg1: { schema: { tags: string[]; description: string; params: { type: string; required: string[]; properties: { id: { type: string; format: string } } }; body: { type: string; properties: { username: { type: string; minLength: number }; email: { type: string; format: string }; firstName: { type: string }; lastName: { type: string } } }; response: { 200: { type: string; properties: { id: { type: string; format: string }; username: { type: string; minLength: number }; email: { type: string; format: string }; firstName: { type: string }; lastName: { type: string }; createdAt: { type: string; format: string }; updatedAt: { type: string; format: string } } } } }; handler: (request: any, reply: any) => any }) => void; delete: (arg0: string, arg1: { schema: { tags: string[]; description: string; params: { type: string; required: string[]; properties: { id: { type: string; format: string } } }; response: { 204: { type: string } } }; handler: (request: any, reply: any) => Promise<void> }) => void }, _options: any) {
// Get all users
  fastify.get('/', {
    schema: {
      tags: ['users'],
      description: 'Get a list of all users with pagination',
      querystring: getUsersSchema.querystring,
      response: getUsersSchema.response
    },
    handler: function (request: { query: { page?: 1 | undefined; limit?: 10 | undefined } }, reply: any) {
      const { page = 1, limit = 10 } = request.query
      
      return {
        data: users,
        total: users.length,
        page: page,
        limit: limit
      }
    }
  })

// Get user by ID
  fastify.get('/:id', {
    schema: {
      tags: ['users'],
      description: 'Get a specific user by ID',
      params: getUserSchema.params,
      response: getUserSchema.response
    },
    handler: function (request: { params: { id: any } }, reply: { code: (arg0: number) => void }) {
      const { id } = request.params
      const user = users.find(u => u.id === id)
      
      if (!user) {
        reply.code(404)
        throw new Error('User not found')
      }
      
      return user
    }
  })

// Create new user
  fastify.post('/', {
    schema: {
      tags: ['users'],
      description: 'Create a new user',
      body: createUserSchema.body,
      response: createUserSchema.response
    },
    handler: function (request: { body: any }, reply: { code: (arg0: number) => void }) {
      const newUser = {
        id: `550e8400-e29b-41d4-a716-${Math.floor(Math.random() * 1000000).toString().padStart(12, '0')}`,
        ...request.body,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      
      // In a real application, you would save to a database here
      // users.push(newUser)
      
      reply.code(201)
      return newUser
    }
  })

// Update user
  fastify.put('/:id', {
    schema: {
      tags: ['users'],
      description: 'Update an existing user',
      params: updateUserSchema.params,
      body: updateUserSchema.body,
      response: updateUserSchema.response
    },
    handler: function (request: { params: { id: any }; body: any }, reply: { code: (arg0: number) => void }) {
      const { id } = request.params
      const userIndex = users.findIndex(u => u.id === id)
      
      if (userIndex === -1) {
        reply.code(404)
        throw new Error('User not found')
      }
      
      // In a real application, you would update in a database here
      const updatedUser = {
        ...users[userIndex],
        ...request.body,
        updatedAt: new Date().toISOString()
      }
      
      return updatedUser
    }
  })

// Delete user
  fastify.delete('/:id', {
    schema: {
      tags: ['users'],
      description: 'Delete a user by ID',
      params: {
        type: 'object',
        required: ['id'],
        properties: {
          id: { type: 'string', format: 'uuid' }
        }
      },
      response: {
        204: {
          type: 'null'
        }
      }
    },
    handler: async (request: { params: { id: any } }, reply: { code: (arg0: number) => { (): any; new(): any; send: { (): void; new(): any } } }) => {
      const { id } = request.params
      const userIndex = users.findIndex(u => u.id === id)
      
      if (userIndex === -1) {
        reply.code(404)
        throw new Error('User not found')
      }
      
      // In a real application, you would delete from a database here
      // users.splice(userIndex, 1)
      
      reply.code(204).send()
    }
  })
}

module.exports = userRoute
