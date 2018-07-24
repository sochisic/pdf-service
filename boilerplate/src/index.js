const Boom = require('boom');
const fastifyBoom = require('fastify-boom');
const fastifyHelmet = require('fastify-helmet');
const fastifySwagger = require('fastify-swagger');
const Fastify = require('fastify');
const config = require('./config');
const swagger = require('./swagger');
const documentation = require('./routes/documentation');

const v1Controller = require('./routes');
const s3Plugin = require('./plugin/s3');

const fastify = Fastify({ logger: config.fastify.logger });

fastify.register(fastifyBoom);
fastify.register(fastifyHelmet);
fastify.register(fastifySwagger, swagger.definition);
fastify.register(s3Plugin, config.s3);

// V1 API

fastify.register(v1Controller, { prefix: '/v1/' });

// GLOBAL API

fastify.register((f, opts, next) => {
  // @ts-ignore
  const swag = f.swagger();

  // @ts-ignore
  fastify.get('/health', { schema: { hide: true } }, async () => ({ status: 'ok' }));
  // @ts-ignore
  fastify.get('/doc', { schema: { hide: true } }, (request, reply) => {
    if (config.fastify.env === 'prod') {
      return reply.send(Boom.notFound());
    }
    return reply.header('Content-Type', 'text/html; charset=UTF-8').send(documentation(swag));
  });

  // @ts-ignore
  fastify.get('/swagger', { schema: { hide: true } }, (request, reply) => {
    if (config.fastify.env === 'prod') {
      return reply.send(Boom.notFound());
    }
    return reply.send(swag);
  });
  next();
});

fastify.decorate('env', config.fastify.env);
fastify.listen(config.fastify.port, (err) => {
  fastify.log.error(err);
});
