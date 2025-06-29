// Require the framework and instantiate it
const fastify = require('fastify')({ 
  logger: true 
})

// Register Swagger
const swagger = require('@fastify/swagger')
const swaggerUI = require('@fastify/swagger-ui')

// Register Swagger plugins
fastify.register(swagger, {
  openapi: {
    info: {
      title: 'KStore API',
      description: 'KStore Backend API documentation',
      version: '1.0.0'
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server'
      }
    ],
    tags: [
      { name: 'users', description: 'User related endpoints' },
      { name: 'products', description: 'Product related endpoints' },
      { name: 'sales', description: 'Sales and order related endpoints' },
      { name: 'category', description: 'Category related endpoints' },
      { name: 'system', description: 'System related endpoints' }
    ]
  }
})

fastify.register(swaggerUI, {
  routePrefix: '/docs',
  uiConfig: {
    docExpansion: 'list',
    deepLinking: false
  }
})

// Declare a route
fastify.get('/', {
  schema: {
    tags: ['system'],
    description: 'Root endpoint that returns a welcome message',
    response: {
      200: {
        type: 'object',
        properties: {
          hello: { type: 'string' }
        }
      }
    }
  },
  handler: async (request: any, reply: any) => {
    return { hello: 'world' }
  }
})

// Add more routes here
fastify.get('/api/status', {
  schema: {
    description: 'Get the current API status',
    tags: ['system'],
    response: {
      200: {
        type: 'object',
        properties: {
          status: { type: 'string' },
          timestamp: { type: 'string', format: 'date-time' }
        }
      }
    }
  },
  handler: async (request: any, reply: any) => {
    return { 
      status: 'online',
      timestamp: new Date().toISOString()
    }
  }
})

// Register route modules
const userRoutes = require('./src/routes/users')
const productRoutes = require('./src/routes/products')
const salesRoutes = require('./src/routes/sales')
const categoryRoutes = require('./src/routes/category')

// Register routes with prefixes
fastify.register(userRoutes, { prefix: '/api/users' })
fastify.register(productRoutes, { prefix: '/api/products' })
fastify.register(salesRoutes, { prefix: '/api/sales' })
fastify.register(categoryRoutes, { prefix: '/api/category' })

// Run the server!
const start = async () => {
  try {
    // Wait for Swagger to be ready before starting the server
    await fastify.ready()
    fastify.swagger()
    
    await fastify.listen({ port: 3000, host: '0.0.0.0' })
    console.log('Documentation available at http://localhost:3000/documentation')
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()
