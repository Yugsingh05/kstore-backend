import Fastify, { FastifyReply, FastifyRequest } from 'fastify';
import swagger from '@fastify/swagger';
import swaggerUI from '@fastify/swagger-ui';
import cors from '@fastify/cors';
import fastifyForm from '@fastify/formbody';
import fastifyExpress from '@fastify/express';

// Route modules
import userRoutes from './src/routes/users';
import productRoutes from './src/routes/products';
import salesRoutes from './src/routes/sales';
import categoryRoutes from './src/routes/category';
import cartRoutes from './src/routes/cart';
import likeRoutes from './src/routes/likes';

const fastify = Fastify({ logger: true });

// Register CORS
fastify.register(cors, {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
});

// Register formbody plugin
fastify.register(fastifyForm);

// ✅ Register Express compatibility plugin
fastify.register(fastifyExpress).after(() => {
  // You can now use express-style `.use()` middleware if needed
  fastify.use((req :FastifyRequest, res :FastifyReply, next: () => void ) => {
    console.log(`[Express Middleware] ${req.method} ${req.url}`);
    next();
  });
});

// Register Swagger
fastify.register(swagger, {
  openapi: {
    info: {
      title: 'KStore API',
      description: 'KStore Backend API documentation',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'https://kstore-backend.onrender.com/',
        description: 'Development server',
      },
    ],
    tags: [
      { name: 'users', description: 'User related endpoints' },
      { name: 'products', description: 'Product related endpoints' },
      { name: 'sales', description: 'Sales and order related endpoints' },
      { name: 'category', description: 'Category related endpoints' },
      { name: 'cart', description: 'Cart related endpoints' },
      { name: 'likes', description: 'Likes related endpoints' },
      { name: 'system', description: 'System related endpoints' },
    ],
  },
});

fastify.register(swaggerUI, {
  routePrefix: '/docs',
  uiConfig: {
    docExpansion: 'list',
    deepLinking: false,
  },
});

// Root route
fastify.get('/', {
  schema: {
    tags: ['system'],
    description: 'Root endpoint that returns a welcome message',
    response: {
      200: {
        type: 'object',
        properties: {
          hello: { type: 'string' },
        },
      },
    },
  },
  handler: async () => {
    return { hello: 'world' };
  },
});

// API Status route
fastify.get('/api/status', {
  schema: {
    description: 'Get the current API status',
    tags: ['system'],
    response: {
      200: {
        type: 'object',
        properties: {
          status: { type: 'string' },
          timestamp: { type: 'string', format: 'date-time' },
        },
      },
    },
  },
  handler: async () => {
    return {
      status: 'online',
      timestamp: new Date().toISOString(),
    };
  },
});

// Register route modules with prefixes
fastify.register(userRoutes, { prefix: '/api/users' });
fastify.register(productRoutes, { prefix: '/api/products' });
fastify.register(salesRoutes, { prefix: '/api/sales' });
fastify.register(categoryRoutes, { prefix: '/api/category' });
fastify.register(cartRoutes, { prefix: '/api/cart' });
fastify.register(likeRoutes, { prefix: '/api/likes' });

// Start server
const start = async () => {
  try {
    await fastify.ready(); // wait for plugins like Swagger
    fastify.swagger();

    await fastify.listen({ port: Number(process.env.PORT), host: '0.0.0.0' });
    console.log('✅ Server running at http://localhost:3005');
    console.log('📘 Swagger docs at http://localhost:3005/docs');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
