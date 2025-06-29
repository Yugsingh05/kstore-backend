/**
 * Sales routes
 */

// Sales schema definitions
const saleItemSchema = {
  type: 'object',
  properties: {
    productId: { type: 'string', format: 'uuid' },
    productName: { type: 'string' },
    quantity: { type: 'integer', minimum: 1 },
    unitPrice: { type: 'number', minimum: 0 },
    subtotal: { type: 'number', minimum: 0 }
  }
}

const saleSchema = {
  type: 'object',
  properties: {
    id: { type: 'string', format: 'uuid' },
    userId: { type: 'string', format: 'uuid' },
    items: { 
      type: 'array',
      items: saleItemSchema
    },
    totalAmount: { type: 'number', minimum: 0 },
    paymentMethod: { type: 'string', enum: ['credit_card', 'debit_card', 'paypal', 'cash'] },
    status: { type: 'string', enum: ['pending', 'completed', 'cancelled', 'refunded'] },
    createdAt: { type: 'string', format: 'date-time' },
    updatedAt: { type: 'string', format: 'date-time' }
  }
}

const createSaleSchema = {
  body: {
    type: 'object',
    required: ['userId', 'items', 'paymentMethod'],
    properties: {
      userId: { type: 'string', format: 'uuid' },
      items: { 
        type: 'array',
        items: {
          type: 'object',
          required: ['productId', 'quantity'],
          properties: {
            productId: { type: 'string', format: 'uuid' },
            quantity: { type: 'integer', minimum: 1 }
          }
        },
        minItems: 1
      },
      paymentMethod: { type: 'string', enum: ['credit_card', 'debit_card', 'paypal', 'cash'] }
    }
  },
  response: {
    201: saleSchema
  }
}

const getSaleSchema = {
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'string', format: 'uuid' }
    }
  },
  response: {
    200: saleSchema
  }
}

const updateSaleStatusSchema = {
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'string', format: 'uuid' }
    }
  },
  body: {
    type: 'object',
    required: ['status'],
    properties: {
      status: { type: 'string', enum: ['pending', 'completed', 'cancelled', 'refunded'] }
    }
  },
  response: {
    200: saleSchema
  }
}

const getSalesSchema = {
  querystring: {
    type: 'object',

    properties : {

   
    page: { type: 'integer', minimum: 1, default: 1 },
    limit: { type: 'integer', minimum: 1, maximum: 100, default: 10 },
    userId: { type: 'string', format: 'uuid' },
    status: { type: 'string', enum: ['pending', 'completed', 'cancelled', 'refunded'] },
    startDate: { type: 'string', format: 'date' },
    endDate: { type: 'string', format: 'date' }
     }
  },
  response: {
    200: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: saleSchema
        },
        total: { type: 'integer' },
        page: { type: 'integer' },
        limit: { type: 'integer' },
        totalAmount: { type: 'number' }
      }
    }
  }
}

// Dummy sales data
const sales = [
  {
    id: '550e8400-e29b-41d4-a716-446655440020',
    userId: '550e8400-e29b-41d4-a716-446655440000',
    items: [
      {
        productId: '550e8400-e29b-41d4-a716-446655440010',
        productName: 'Smartphone X',
        quantity: 1,
        unitPrice: 999.99,
        subtotal: 999.99
      },
      {
        productId: '550e8400-e29b-41d4-a716-446655440011',
        productName: 'Wireless Headphones',
        quantity: 1,
        unitPrice: 249.99,
        subtotal: 249.99
      }
    ],
    totalAmount: 1249.98,
    paymentMethod: 'credit_card',
    status: 'completed',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440021',
    userId: '550e8400-e29b-41d4-a716-446655440001',
    items: [
      {
        productId: '550e8400-e29b-41d4-a716-446655440012',
        productName: 'Laptop Pro',
        quantity: 1,
        unitPrice: 1499.99,
        subtotal: 1499.99
      }
    ],
    totalAmount: 1499.99,
    paymentMethod: 'paypal',
    status: 'completed',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
]

/**
 * Sales routes plugin
 * @param {FastifyInstance} fastify 
 * @param {Object} options 
 */
async function salesRoute(fastify: { get: (arg0: string, arg1: { schema: { tags: string[]; description: string; querystring: { type: string; properties: { page: { type: string; minimum: number; default: number }; limit: { type: string; minimum: number; maximum: number; default: number }; userId: { type: string; format: string }; status: { type: string; enum: string[] }; startDate: { type: string; format: string }; endDate: { type: string; format: string } } }; response: { 200: { type: string; properties: { data: { type: string; items: { type: string; properties: { id: { type: string; format: string }; userId: { type: string; format: string }; items: { type: string; items: { type: string; properties: { productId: { type: string; format: string }; productName: { type: string }; quantity: { type: string; minimum: number }; unitPrice: { type: string; minimum: number }; subtotal: { type: string; minimum: number } } } }; totalAmount: { type: string; minimum: number }; paymentMethod: { type: string; enum: string[] }; status: { type: string; enum: string[] }; createdAt: { type: string; format: string }; updatedAt: { type: string; format: string } } } }; total: { type: string }; page: { type: string }; limit: { type: string }; totalAmount: { type: string } } } } } | { tags: string[]; description: string; params: { type: string; required: string[]; properties: { id: { type: string; format: string } } }; response: { 200: { type: string; properties: { id: { type: string; format: string }; userId: { type: string; format: string }; items: { type: string; items: { type: string; properties: { productId: { type: string; format: string }; productName: { type: string }; quantity: { type: string; minimum: number }; unitPrice: { type: string; minimum: number }; subtotal: { type: string; minimum: number } } } }; totalAmount: { type: string; minimum: number }; paymentMethod: { type: string; enum: string[] }; status: { type: string; enum: string[] }; createdAt: { type: string; format: string }; updatedAt: { type: string; format: string } } } } }; handler: ((request: any, reply: any) => Promise<{ data: { id: string; userId: string; items: { productId: string; productName: string; quantity: number; unitPrice: number; subtotal: number }[]; totalAmount: number; paymentMethod: string; status: string; createdAt: string; updatedAt: string }[]; total: number; page: any; limit: any; totalAmount: number }>) | ((request: any, reply: any) => Promise<{ id: string; userId: string; items: { productId: string; productName: string; quantity: number; unitPrice: number; subtotal: number }[]; totalAmount: number; paymentMethod: string; status: string; createdAt: string; updatedAt: string }>) }) => void; post: (arg0: string, arg1: { schema: { tags: string[]; description: string; body: { type: string; required: string[]; properties: { userId: { type: string; format: string }; items: { type: string; items: { type: string; required: string[]; properties: { productId: { type: string; format: string }; quantity: { type: string; minimum: number } } }; minItems: number }; paymentMethod: { type: string; enum: string[] } } }; response: { 201: { type: string; properties: { id: { type: string; format: string }; userId: { type: string; format: string }; items: { type: string; items: { type: string; properties: { productId: { type: string; format: string }; productName: { type: string }; quantity: { type: string; minimum: number }; unitPrice: { type: string; minimum: number }; subtotal: { type: string; minimum: number } } } }; totalAmount: { type: string; minimum: number }; paymentMethod: { type: string; enum: string[] }; status: { type: string; enum: string[] }; createdAt: { type: string; format: string }; updatedAt: { type: string; format: string } } } } }; handler: (request: any, reply: any) => Promise<{ id: string; userId: any; items: any; totalAmount: any; paymentMethod: any; status: string; createdAt: string; updatedAt: string }> }) => void; patch: (arg0: string, arg1: { schema: { tags: string[]; description: string; params: { type: string; required: string[]; properties: { id: { type: string; format: string } } }; body: { type: string; required: string[]; properties: { status: { type: string; enum: string[] } } }; response: { 200: { type: string; properties: { id: { type: string; format: string }; userId: { type: string; format: string }; items: { type: string; items: { type: string; properties: { productId: { type: string; format: string }; productName: { type: string }; quantity: { type: string; minimum: number }; unitPrice: { type: string; minimum: number }; subtotal: { type: string; minimum: number } } } }; totalAmount: { type: string; minimum: number }; paymentMethod: { type: string; enum: string[] }; status: { type: string; enum: string[] }; createdAt: { type: string; format: string }; updatedAt: { type: string; format: string } } } } }; handler: (request: any, reply: any) => Promise<{ status: any; updatedAt: string; id: string; userId: string; items: { productId: string; productName: string; quantity: number; unitPrice: number; subtotal: number }[]; totalAmount: number; paymentMethod: string; createdAt: string }> }) => void }, options: any) {
  // Get all sales with optional filters
  fastify.get('/', {
    schema: {
      tags: ['sales'],
      description: 'Get all sales with optional filters',
      querystring: getSalesSchema.querystring,
      response: getSalesSchema.response
    },
    handler: async (request: { query: { page?: 1 | undefined; limit?: 10 | undefined; userId: any; status: any; startDate: any; endDate: any } }, reply: any) => {
      const { 
        page = 1, 
        limit = 10, 
        userId, 
        status,
        startDate,
        endDate 
      } = request.query
      
      let filteredSales = [...sales]
      
      // Apply filters
      if (userId) {
        filteredSales = filteredSales.filter(s => s.userId === userId)
      }
      
      if (status) {
        filteredSales = filteredSales.filter(s => s.status === status)
      }
      
      if (startDate && endDate) {
        const start = new Date(startDate)
        const end = new Date(endDate)
        filteredSales = filteredSales.filter(s => {
          const saleDate = new Date(s.createdAt)
          return saleDate >= start && saleDate <= end
        })
      }
      
      // Calculate total amount
      const totalAmount = filteredSales.reduce((sum, sale) => sum + sale.totalAmount, 0)
      
      return {
        data: filteredSales,
        total: filteredSales.length,
        page: page,
        limit: limit,
        totalAmount
      }
    }
  })

  // Get sale by ID
  fastify.get('/:id', {
    schema: {
      tags: ['sales'],
      description: 'Get a specific sale by ID',
      params: getSaleSchema.params,
      response: getSaleSchema.response
    },
    handler: async (request: { params: { id: any } }, reply: { code: (arg0: number) => void }) => {
      const { id } = request.params
      const sale = sales.find(s => s.id === id)
      
      if (!sale) {
        reply.code(404)
        throw new Error('Sale not found')
      }
      
      return sale
    }
  })

  // Create new sale
  fastify.post('/', {
    schema: {
      tags: ['sales'],
      description: 'Create a new sale',
      body: createSaleSchema.body,
      response: createSaleSchema.response
    },
    handler: async (request: { body: { userId: any; items: any; paymentMethod: any } }, reply: { code: (arg0: number) => void }) => {
      // In a real application, you would:
      // 1. Validate product IDs exist
      // 2. Check inventory
      // 3. Calculate prices based on product data
      // 4. Create a transaction
      
      // Dummy implementation
      const { userId, items, paymentMethod } = request.body
      
      // Create sale items with mock data
      const saleItems = items.map((item: { productId: string; quantity: number }) => {
        const unitPrice = Math.floor(Math.random() * 100000) / 100 // Random price
        return {
          productId: item.productId,
          productName: `Product ${item.productId.substring(0, 8)}`,
          quantity: item.quantity,
          unitPrice,
          subtotal: unitPrice * item.quantity
        }
      })
      
      // Calculate total
      const totalAmount = saleItems.reduce((sum: any, item: { subtotal: any }) => sum + item.subtotal, 0)
      
      const newSale = {
        id: `550e8400-e29b-41d4-a716-${Math.floor(Math.random() * 1000000).toString().padStart(12, '0')}`,
        userId,
        items: saleItems,
        totalAmount,
        paymentMethod,
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      
      // In a real application, you would save to a database here
      // sales.push(newSale)
      
      reply.code(201)
      return newSale
    }
  })

  // Update sale status
  fastify.patch('/:id/status', {
    schema: {
      tags: ['sales'],
      description: 'Update the status of a sale',
      params: updateSaleStatusSchema.params,
      body: updateSaleStatusSchema.body,
      response: updateSaleStatusSchema.response
    },
    handler: async (request: { params: { id: any }; body: { status: any } }, reply: { code: (arg0: number) => void }) => {
      const { id } = request.params
      const { status } = request.body
      
      const saleIndex = sales.findIndex(s => s.id === id)
      
      if (saleIndex === -1) {
        reply.code(404)
        throw new Error('Sale not found')
      }
      
      // In a real application, you would update in a database here
      const updatedSale = {
        ...sales[saleIndex],
        status,
        updatedAt: new Date().toISOString()
      }
      
      return updatedSale
    }
  })
}

module.exports = salesRoute
