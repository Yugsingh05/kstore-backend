// Require the framework and instantiate it
import Fastify from 'fastify'
import swagger from '@fastify/swagger'
import swaggerUI from '@fastify/swagger-ui'
import cors from '@fastify/cors'

const fastify = Fastify({ logger: true })

// Register Swagger
fastify.register(cors, {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
})

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
      { name: 'cart', description: 'Cart related endpoints' },
      { name: 'likes', description: 'Likes related endpoints' },
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
import userRoutes from './src/routes/users'
import productRoutes from './src/routes/products'
import salesRoutes from './src/routes/sales'
import categoryRoutes from './src/routes/category'
import cartRoutes from './src/routes/cart'
import likeRoutes from './src/routes/likes'

// Register routes with prefixes
fastify.register(userRoutes, { prefix: '/api/users' })
fastify.register(productRoutes, { prefix: '/api/products' })
fastify.register(salesRoutes, { prefix: '/api/sales' })
fastify.register(categoryRoutes, { prefix: '/api/category' })
fastify.register(cartRoutes, { prefix: '/api/cart' })
fastify.register(likeRoutes, { prefix: '/api/likes' })

// Run the server!
const start = async () => {
  try {
    // Wait for Swagger to be ready before starting the server
    await fastify.ready()
    fastify.swagger()
    
    await fastify.listen({ port: 3005, host: '0.0.0.0' })
    console.log('Documentation available at http://localhost:3000/documentation')
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()
