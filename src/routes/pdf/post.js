const moment = require('moment/min/moment-with-locales');
const schema = require('./json-api-schema');
const { getDocDefinition, createPdfBinary } = require('../../pdfcreate-service/pdfcreate');

moment.locale('it');

const dateFormat = 'DD/MM/YYYY';

module.exports = (fastify, opts, next) => {
  fastify.post('/', (req, reply) => {
    const data = req.body;
    // const body = req.body;
    // console.log(schema.body.properties.recipient.properties.address.properties.province.pattern);

    // const reg = new RegExp(schema.body.properties.recipient.properties.address.properties.province.pattern);
    // console.log('MB'.match(reg));

    // console.log(data.recipient.address.province);

    // data = body;

    const docDefinition = getDocDefinition(data);

    createPdfBinary(
      docDefinition,
      (binary) => {
        reply
          .code(200)
          .header('Content-Type', 'application/pdf')
          .header(
            'Content-Disposition',
            `attachment; filename="Invoice for ${data.recipient.name} at ${moment().format(
              `${dateFormat} HH:mm`,
            )}.pdf"`,
          )
          .send(binary);
      },
      (error) => {
        reply.code(500).send(`ERROR:${error}`);
      },
    );
  });
  next();
};
