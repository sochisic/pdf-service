const moment = require('moment/min/moment-with-locales');
const fs = require('fs');
const { getDocDefinition, createPdfBinary } = require('../../pdfcreate-service/pdfcreate');

const schema = JSON.parse(fs.readFileSync('./json-api-schema.json', 'utf8'));

moment.locale('it');

const dateFormat = 'DD/MM/YYYY';

module.exports = (fastify, opts, next) => {
  fastify.post('/', { schema }, (req, reply) => {
    const data = req.body;
    const docDefinition = getDocDefinition(data);

    createPdfBinary(docDefinition, (binary) => {
      reply
        .code(200)
        .header('Content-Type', 'application/pdf')
        .header(
          'Content-Disposition',
          `attachment; filename="Invoice for ${data.recipient.name} at ${moment().format(`${dateFormat} HH:mm`)}.pdf"`,
        )
        .send(binary);
    });
  });
  next();
};
