module.exports = {
  definition: {
    swagger: {
      swagger: '2.0',
      info: {
        title: 'API Gateway',
        description: 'A minimal and fast 🐨 API Gateway, based on Fastify.',
        version: '1.0.0-alpha',
      },
      schemes: ['https'],
      host: '-',
      consumes: ['application/json'],
      produces: ['application/json'],
      securityDefinitions: {
        AuthToken: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      externalDocs: {
        description: 'Find more info here',
        url: '-',
      },
    },
  },
};
