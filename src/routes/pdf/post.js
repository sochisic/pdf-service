const pdfMakePrinter  = require('pdfmake');
const path = require('path');
const moment = require('moment/min/moment-with-locales');
moment.locale('it');

const dateFormat = "DD/MM/YYYY";

// const body = {
//     "regimeType": "minimum",
//     "invoiceNumber": "007",
//     "fiscalYear": 2000,
//     "emissionDate": "2018-07-20T12:15:48.320Z",
//     "dueDate": "2018-07-20T12:15:48.320Z",
//     "productivePeriodMonth": 2,
//     "productivePeriodYear": 2015,
//     "total": 1000000,
//     "payment": {
//         "paymentCondition": "Abababa",
//         "bank": "MyPersonalBank"
//     },
//     "iban": "Ueban",
//     "recipient": {
//         "name": "RecipientName",
//         "vatNumber": "Babab",
//         "fiscalCode": "safsdfsdf",
//         "address": {
//             "route": "sdfd",
//             "houseNumber": "cvbcvb",
//             "postalCode": "ksldf lksd kjfslkd flskjd f",
//             "city": "sdl ;sd fs;lk jskd fsld fkj",
//             "province": "CA",
//             "country": "ZHOPA"
//         }
//     },
//     "sender": {
//         "name": "Vadim",
//         "vatNumber": "007",
//         "fiscalCode": "0000---0000---0000",
//         "address": {
//             "route": "Via Monte Bianco",
//             "houseNumber": "60/A",
//             "postalCode": "20089",
//             "city": "Rozzano",
//             "province": "MI",
//             "country": "Italia"
//         }
//     },
//     "content": {
//         "entries": [
//             {
//               "name": "row1",
//               "value": 212.12121
//             },
//             {
//               "name": "row1",
//               "value": 212.12121
//             },
//             {
//               "name": "row1",
//               "value": 212000.12121
//             },
//             {
//               "name": "row1",
//               "value": 212000.12121
//             },
//             {
//               "name": "row1",
//               "value": 212000.12121
//             },
//             {
//               "name": "row1",
//               "value": 212000.12121
//             },
//             {
//               "name": "row1",
//               "value": 212000.12121
//             },
//             {
//               "name": "row1",
//               "value": 212000.12121
//             },
//             {
//               "name": "row1",
//               "value": 212000.12121
//             },
//             {
//               "name": "row1",
//               "value": 212000.12121
//             },
//             {
//               "name": "row1",
//               "value": 212000.12121
//             },
//             {
//               "name": "row1",
//               "value": 212000.12121
//             },
//             {
//               "name": "row1",
//               "value": 212000.12121
//             },
//             {
//               "name": "row1",
//               "value": 212000.12121
//             },
//             {
//               "name": "row1",
//               "value": 212000.12121
//             },
//             {
//               "name": "row1",
//               "value": 212000.12121
//             },
//             {
//               "name": "row1",
//               "value": 212000.12121
//             },
//             {
//               "name": "row1",
//               "value": 212000.12121
//             },
//             {
//               "name": "row1",
//               "value": 212000.12121
//             },
//             {
//               "name": "row1",
//               "value": 212000.12121
//             },
//             {
//               "name": "row1",
//               "value": 212000.12121
//             },
//             {
//               "name": "row1",
//               "value": 212000.12121
//             }
//         ],
//         "total": {
//           "name": "asdasd",
//           "value": 4545.96
//         }
//     },
//     "tax": {
//         "entries": [
//             {
//               "name": "sdf sdf",
//               "value": 121212
//             },
//             {
//               "name": "sdf sdf",
//               "value": 121212
//             }
//         ]
//     }
// }

function createPdfBinary(pdfDoc, callback) {
  const fontDescriptors = {
    Roboto: {
      normal: path.join(__dirname, '../../../fonts/Roboto-Regular.ttf'),
      bold: path.join(__dirname, '../../../fonts/Roboto-Medium.ttf'),
      italics: path.join(__dirname, '../../../fonts/Roboto-Italic.ttf'),
      bolditalics: path.join(__dirname, '../../../fonts/Roboto-MediumItalic.ttf')
    }
  };

  const printer = new pdfMakePrinter(fontDescriptors);

  const doc = printer.createPdfKitDocument(pdfDoc);

  const chunks = [];
  let result;

  doc.on('data', function (chunk) {
    chunks.push(chunk);
  });
  doc.on('end', function () {
    result = Buffer.concat(chunks);
    callback(result);
  });
  doc.end();
}

function getRegimeText(regimeType) {
  switch(regimeType) {
    case 'minimum':
      return '{{ REGIME FORFETTARIO }}';
    case 'flat':
      return '{{ REGIME DEI MINIMI }}';
    default:
      return '{{ REGIME ORDINARIO }}';
  }
}
function getAfterRowsText(data) {
  switch(data.regimeType) {
    case 'minimum':
      return [
        { text: 'Compenso non assoggettato a ritenuta d’acconto ai sensi dell’art. 27 del D.L. n. 98 del 06.07.2011'+
          ' Operazione effettuata da soggetto appartenente a regime fiscale di vantaggio per l’imprenditoria giovanile'+
          ' e per i lavoratori in mobilità ai sensi dell’art. 27, commi 1 e 2, del D.L. n. 98 del 06.07.2011'+
          ' Imposta di bollo assolta sull’originale'},
        { style: 'redText', text: ' {{ OBBLIGATORIA SE FATTURA SUPERA I 77,47€ }}' }
      ];
    case 'flat':
      return [
        { text: 'Fattura esente IVA ex articolo 10, comma 1, n. 18, del D.P.R. n. 633 del 1972'+
            ' Operazione effettuata ai sensi dell’art. 1, commi da 54 a 89 della Legge n. 190/2014 – Regime forfettario'+
            ' Il compenso non è soggetto a ritenute d’acconto ex articolo 1, comma 67, della Legge n. 190 del 2014'+
            ' Imposta di bollo assolta sull’originale'},
        { style: 'redText', text: ' {{ OBBLIGATORIA SE FATTURA SUPERA I 77,47€ }}' }
      ];
    default:
      return [
        { text: 'Fattura esente IVA ex articolo 10, comma 1, n. 18, del D.P.R. n. 633 del 1972' }
      ];
  }
}

function topHeaderBox(data) {
  const result = [];

  data.name && result.push({ style: 'title', text:  data.name });
  data.address.route && result.push({ style: 'left', text: `${data.address.route}, ${data.address.houseNumber}` });
  data.address.postalCode && result.push({ style: 'left', text: `${data.address.postalCode} - ${data.address.city}(${data.address.province})` });
  data.address.country && result.push({ style: 'addressLast', text:  data.address.country });
  data.fiscalCode && result.push({ style: 'left', text:  data.fiscalCode });
  data.vatNumber && result.push({ style: 'left', text:  data.vatNumber });

  return result;
}

function payment(data) {
  const result = [];

  (data.payment || {}).paymentCondition && result.push({ text:  `Condizioni di pagamento: ${(data.payment || {}).paymentCondition}` });
  (data.payment || {}).bank && result.push({ text:  `Banca d’appoggio:  ${(data.payment || {}).bank}` });
  data.iban && result.push({ text:  `Codice IBAN: ${data.iban}` });
  result.push({ text:  ` ` });
  data.dueDate && result.push({ bold: true, text:  `Scadenza fattura:  ${moment(data.dueDate).format(dateFormat)}` });

  return result;
}

function getDescription(data) {
  return `Prestazione di servizi professionali in relazione all’intermediazione` +
    `di prodotti assicurativi nel mese di ${moment().month(data.productivePeriodMonth).format('MMMM').toLowerCase()} ${data.productivePeriodYear}`;
}

function getEntities(data) {
  const result = [];
  (data.content.entries || []).forEach((it, index) => {
    result.push([
      {
        border: [ false, false, false, false],
        text: it.name, aligment: 'left' },
      {
        border: [ false, false, false, data.content.entries.length > 1 && index === data.content.entries.length - 1],
        text: `Euro ${it.value}`,
        aligment: 'right',
        width: '*'
      },
    ]);
  })

  result.push([
    { 
        border: [ false, false, false, false],
        text: data.content.total.name, aligment: 'left'
    },
    {
      border: [ false, false, false, false],
      text: `Euro ${data.content.total.value}`,
      aligment: 'right',
      width: '*'
    }
  ]);
  result.push([
    { 
      border: [ false, false, false, false],
      text: ''
    },
    {
      border: [ false, false, false, false],
      text: ''
    }
  ]);

  (data.tax.entries || []).forEach((it, index) => {
    result.push([
      {
        border: [ false, false, false, false],
        text: it.name, aligment: 'left' },
      {
        text: `Euro ${it.value}`,
        aligment: 'right',
        border: [false, false, false, data.tax.entries.length > 1 && index === data.tax.entries.length - 1 ],
        width: '*'
      },
    ]);
  })


  result.push([
    {
      border: [ false, false, false, false],
      bold: true,
      text: 'Totale fattura', aligment: 'left' },
    {
      border: [ false, false, false, false],
      bold: true, text: `Euro ${data.total}`
    }
  ]);

  return result;
}

function getDocDefinition(data) {
  const result = {
    content: [
      {
        table: {
          widths: [300, '*'],
          body: [
            [
              {
                aligment: 'left',
                columns: [
                  [
                    ...topHeaderBox(data.sender || { address: {} })
                  ],
                ]
              },
              { text: ' ' },
            ]
          ],
        },
        layout: 'noBorders'
      },
      {
        table: {
          widths: ['*', 300],
          body: [
            [
              { text: ' ' },
              {
                aligment: 'left',
                columns: [
                  [
                    ...topHeaderBox(data.recipient || { address: {} })
                  ],
                ]
              },
            ]
          ],
        },
        layout: 'noBorders'
      },
      { style: 'regime', text: getRegimeText(data.regimeType || 'ordinary') },
      { style: 'invoice', text: `${data.invoiceNumber} ${data.fiscalYear} del ${moment(data.emissionDate).format(dateFormat)}` },
      { style: 'description', text: getDescription(data) },
      {
        table: {
          widths: ['*', 200],
          body: [
            ...getEntities(data)
          ]
        }
      },
      { style: 'sep', text: '' },
      ...getAfterRowsText(data),
      { style: 'sep', text: '' },
      ...payment(data)
    ],
    styles: {
      title: {
        fontSize: 16,
        fontWeight: 900,
        marginBottom: 6
      },
      addressLast: {
        marginBottom: 6
      },
      regime: {
        color: 'red',
        marginTop: 15,
        marginBottom: 15
      },
      redText: {
        color: 'red',
      },
      right: {
        aligment: 'right',
        textAlign: 'right'
      },
      invoice: {
        fontSize: 18,
        fontWeight: 900,
        marginBottom: 15
      },
      description: {
        marginBottom: 30
      },
      boldText: {
        fontWeight: 900
      },
      sep: {
        marginBottom: 30
      },
    }
  };

  return result;
}


module.exports = (fastify, opts, next) => {
  fastify.post('/', function (req, reply) {
    let data = req.body;

    // data = body;

    const docDefinition = getDocDefinition(data);

    createPdfBinary(docDefinition, function(binary) {
      reply
        .code(200)
        .header('Content-Type', 'application/pdf')
        .header('Content-Disposition', 'attachment; filename="Invoice for ' + data.recipient.name + ' at ' + moment().format(dateFormat + ' HH:mm') + '.pdf"')
        .send(binary);

    }, function(error) {
      reply.code(500).send('ERROR:' + error);
    });
  })
  next();
};