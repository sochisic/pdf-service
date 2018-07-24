/* eslint global-require: 0 */

const cors = require('cors');

const root = (fastify, opts, next) => {
  fastify.use(cors());

  fastify.options('*', { schema: { hide: true } }, (request, reply) => {
    reply.code(200).send('ok');
  });

  // eslint-disable-next-line security/detect-non-literal-require, import/no-dynamic-require
  const r = (path, uri) => fastify.register(require(path), { prefix: uri });

  r('./foos/bars/get', '/foos/:fooId/bars/:barId');

  next();
};

module.exports = root;
