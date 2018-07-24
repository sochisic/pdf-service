module.exports = (fastify, opts, next) => {
  const options = {
    schema: {
      summary: 'A Sample API',
      description: 'This is an awesome sample API',
      tags: ['sample'],
      params: {
        type: 'object',
        properties: {
          fooId: {
            type: 'string',
            description: 'The ID of Foo',
          },
          barId: {
            type: 'string',
            description: 'The ID of Bar',
          },
        },
      },
      querystring: {
        type: 'object',
        required: ['something'],
        properties: {
          something: {
            type: 'boolean',
            description: 'Something to set',
          },
        },
      },
      response: {
        200: {
          type: 'object',
          required: ['_meta', 'item'],
          description: 'A Bar Object',
          properties: {
            _id: {
              type: 'string',
              description: 'ID of Bar',
            },
            name: {
              type: 'string',
              description: 'Name of Bar',
            },
            age: {
              type: 'string',
              description: 'The age of Bar',
            },
          },
        },
      },
    },
  };

  fastify.get('/', options, (request, reply) =>
    reply.send({
      _id: request.params.barId,
      fooId: request.params.fooId,
      name: 'Azuzu',
      age: 23,
    }),
  );
  next();
};
