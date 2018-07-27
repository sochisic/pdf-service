const PdfMakePrinter = require('pdfmake');
const path = require('path');
const moment = require('moment/min/moment-with-locales');
const formatEUR = require('../utils/formatEUR');
const pad = require('../utils/pad');

moment.locale('it');
const dateFormat = 'DD/MM/YYYY';

// const testbody = {
//   regimeType: 'minimum',
//   invoiceNumber: '007',
//   fiscalYear: 2000,
//   emissionDate: '2018-07-20T12:15:48.320Z',
//   dueDate: '2018-07-20T12:15:48.320Z',
//   productivePeriodMonth: 2,
//   productivePeriodYear: 2015,
//   total: 1000000,
//   payment: {
//     paymentCondition: 'pagamento a vista',
//     bank: 'Unicredit – Filiale di Cefalù – Piazza Garibaldi, 2',
//   },
//   iban: 'IT 23 T 02008 43260 000103943030',
//   recipient: {
//     name: 'Spett.le',
//     vatNumber: '09528651004',
//     fiscalCode: 'P.IVA e C.F.',
//     address: {
//       route: 'Via Monte Bianco,',
//       houseNumber: '60/A',
//       postalCode: '20089',
//       city: 'Rozzano',
//       province: 'MI',
//       country: 'Italia',
//     },
//   },
//   sender: {
//     name: 'Antonio Pizzardi',
//     vatNumber: 'P.IVA 03146970961',
//     fiscalCode: 'C.F. PZZNTN72H12E617O',
//     address: {
//       route: 'Via Carlo Cattaneo, 6',
//       houseNumber: '60/A',
//       postalCode: '20821',
//       city: 'Meda',
//       province: 'MB',
//       country: 'Italia',
//     },
//   },
//   content: {
//     entries: [
//       {
//         name: 'row1',
//         value: 8424.0,
//       },
//       {
//         name: 'row1',
//         value: 7330.71,
//       },
//       {
//         name: 'row1',
//         value: 4847.6,
//       },
//       {
//         name: 'row1',
//         value: 21200.12,
//       },
//       {
//         name: 'row1',
//         value: 12000.12,
//       },
//       {
//         name: 'row1',
//         value: 21200.12,
//       },
//       {
//         name: 'row1',
//         value: 21200.12,
//       },
//       {
//         name: 'row1',
//         value: 2120.12,
//       },
//       {
//         name: 'row1',
//         value: 212000.12,
//       },
//       {
//         name: 'row1',
//         value: 212000.12,
//       },
//       {
//         name: 'row1',
//         value: 212000.12,
//       },
//       {
//         name: 'row1',
//         value: 4847.6,
//       },
//       {
//         name: 'row1',
//         value: 21200.12,
//       },
//       {
//         name: 'row1',
//         value: 12000.12,
//       },
//       {
//         name: 'row1',
//         value: 21200.12,
//       },
//       {
//         name: 'row1',
//         value: 21200.12,
//       },
//       {
//         name: 'row1',
//         value: 2120.12,
//       },
//       {
//         name: 'row1',
//         value: 212000.12,
//       },
//       {
//         name: 'row1',
//         value: 212000.12,
//       },
//       {
//         name: 'row1',
//         value: 212000.12,
//       },
//       {
//         name: 'row1',
//         value: 8424.0,
//       },
//       {
//         name: 'row1',
//         value: 7330.71,
//       },
//       {
//         name: 'row1',
//         value: 4847.6,
//       },
//       {
//         name: 'row1',
//         value: 21200.12,
//       },
//       {
//         name: 'row1',
//         value: 12000.12,
//       },
//     ],
//     total: {
//       name: 'Total without tax',
//       value: 20602.31,
//     },
//   },
//   tax: {
//     entries: [
//       {
//         name: 'tax1',
//         value: 121212,
//       },
//       {
//         name: 'tax2',
//         value: 121212,
//       },
//     ],
//   },
// };

function createPdfBinary(pdfDoc, callback, error) {
  const fontDescriptors = {
    Roboto: {
      normal: path.join(__dirname, '../fonts/Lato-Light.ttf'),
      bold: path.join(__dirname, '../fonts/Lato-Regular.ttf'),
      italics: path.join(__dirname, '../fonts/Lato-Italic.ttf'),
      bolditalics: path.join(__dirname, '../fonts/Lato-BoldItalic.ttf'),
    },
  };

  const printer = new PdfMakePrinter(fontDescriptors);

  const doc = printer.createPdfKitDocument(pdfDoc);

  const chunks = [];
  let result;

  doc.on('data', (chunk) => {
    chunks.push(chunk);
  });
  doc.on('end', () => {
    result = Buffer.concat(chunks);
    callback(result);
  });
  doc.on('error', (err) => {
    error(err);
  });

  doc.end();
}

function getRegimeText(regimeType) {
  switch (regimeType) {
    case 'flat':
      return '{{ REGIME FORFETTARIO }}';
    case 'minimum':
      return '{{ REGIME DEI MINIMI }}';
    default:
      return '{{ REGIME ORDINARIO }}';
  }
}

function getAfterRowsText(data) {
  switch (data.regimeType) {
    case 'flat':
      return [
        {
          fontSize: 11,
          lineHeight: 1.4,
          letterSpacing: 2.1,
          text: [
            {
              text:
                ' Fattura esente IVA ex articolo 10, comma 1, n. 18, del D.P.R. n. 633 del 1972\n' +
                ' Operazione effettuata ai sensi dell’art. 1, commi da 54 a 89 della Legge n. 190/2014 – Regime forfettario\n' +
                ' Il compenso non è soggetto a ritenute d’acconto ex articolo 1, comma 67, della Legge n. 190 del 2014\n' +
                'Imposta di bollo assolta sull’originale',
            },
            { style: 'redText', text: ' {{ OBBLIGATORIA SE FATTURA SUPERA I 77,47€ }}' },
          ],
        },
      ];
    case 'minimum':
      return [
        {
          fontSize: 11,
          letterSpacing: 1.5,
          lineHeight: 1.3,
          text: [
            {
              text:
                ' Compenso non assoggettato a ritenuta d’acconto ai sensi dell’art. 27 del D.L. n. 98 del 06.07.2011\n' +
                ' Operazione effettuata da soggetto appartenente a regime fiscale di vantaggio per l’imprenditoria giova-\n' +
                ' nile e per i lavoratori in mobilità ai sensi dell’art. 27, commi 1 e 2, del D.L. n. 98 del 06.07.2011\n' +
                ' Imposta di bollo assolta sull’originale',
            },
            { style: 'redText', text: ' {{ OBBLIGATORIA SE FATTURA SUPERA I 77,47€ }}' },
          ],
        },
      ];
    case 'ordinary':
      return [
        {
          fontSize: 11,
          lineHeight: 1.4,
          letterSpacing: 2.1,
          text: 'Fattura esente IVA ex articolo 10, comma 1, n. 18, del D.P.R. n. 633 del 1972',
        },
      ];
    default:
      return [
        {
          fontSize: 11,
          lineHeight: 1.4,
          letterSpacing: 2.1,
          text: 'Fattura esente IVA ex articolo 10, comma 1, n. 18, del D.P.R. n. 633 del 1972',
        },
      ];
  }
}

function topHeaderBoxSender(data) {
  const result = [];

  data.name &&
    result.push({
      style: 'title',
      text: data.name,
    });
  data.address.route &&
    result.push({
      text: `${data.address.route}, ${data.address.houseNumber}`,
    });
  data.address.postalCode &&
    result.push({
      text: `${data.address.postalCode} - ${data.address.city} (${data.address.province})`,
    });
  data.address.country && result.push({ style: 'addressLast', text: data.address.country });
  data.fiscalCode && result.push({ text: data.fiscalCode });
  data.vatNumber && result.push({ text: `P.IVA ${data.vatNumber}` });

  return result;
}

function topHeaderBoxRecipient(data) {
  const result = [];

  data.name &&
    result.push({
      style: 'titleRecipient',
      text: data.name,
    });
  data.address.route &&
    result.push({
      text: `${data.address.route}, ${data.address.houseNumber}`,
    });
  data.address.postalCode &&
    result.push({
      text: `${data.address.postalCode} - ${data.address.city} (${data.address.province})`,
    });
  data.address.country && result.push({ style: 'addressLast', text: data.address.country });
  data.vatNumber && data.fiscalCode && result.push({ text: `P.IVA e C.F. ${data.vatNumber} ${data.fiscalCode}` });

  return result;
}

function payment(data) {
  const result = [];

  (data.payment || {}).paymentCondition &&
    result.push({
      fontSize: 11,
      letterSpacing: 1.5,
      lineHeight: 1.3,
      text: `Condizioni di pagamento: ${(data.payment || {}).paymentCondition}`,
    });
  (data.payment || {}).bank &&
    result.push({
      fontSize: 11,
      letterSpacing: 1.5,
      lineHeight: 1.3,
      text: `Banca d’appoggio:  ${(data.payment || {}).bank}`,
    });
  data.iban && result.push({ fontSize: 11, letterSpacing: 1.5, lineHeight: 1.3, text: `Codice IBAN: ${data.iban}` });
  result.push({ text: ' ' });
  data.dueDate &&
    result.push({
      bold: true,
      letterSpacing: 1.65,
      fontSize: 11,
      text: `Scadenza fattura:  ${moment(data.dueDate).format(dateFormat)}`,
    });

  return result;
}

function getDescription(data) {
  return (
    'Prestazione di servizi professionali in relazione all’inter mediazione ' +
    `di prodotti assicurativi nel mese di ${moment()
      .month(data.productivePeriodMonth - 1)
      .format('MMMM')
      .toLowerCase()} ${data.productivePeriodYear}.`
  );
}

function getEntities(data) {
  const result = [];
  (data.content.entries || []).forEach((it, index) => {
    result.push([
      {
        border: [false, false, false, false],
        text: it.name,
        alignment: 'left',
        marginLeft: 5,
      },
      {
        border: [false, false, false, data.content.entries.length > 1 && index === data.content.entries.length - 1],
        text: 'Euro',
        alignment: 'left',
        textAlign: 'left',
        lineHeight: 0.8,
      },
      {
        border: [false, false, false, data.content.entries.length > 1 && index === data.content.entries.length - 1],
        text: formatEUR(it.value),
        alignment: 'right',
        textAlign: 'right',
        lineHeight: 0.8,
      },
    ]);
  });

  result.push([
    {
      border: [false, false, false, false],
      text: data.content.total.name,
      alignment: 'left',
      marginLeft: 5,
    },
    {
      border: [false, false, false, false],
      text: 'Euro',
      alignment: 'left',
      textAlign: 'left',
    },
    {
      border: [false, false, false, false],
      text: formatEUR(data.content.total.value),
      alignment: 'right',
      textAlign: 'right',
    },
  ]);
  result.push([
    {
      border: [false, false, false, false],
      text: '',
    },
    {
      border: [false, false, false, false],
      text: '',
    },
    {
      border: [false, false, false, false],
      text: '',
    },
  ]);

  (data.tax.entries || []).forEach((it, index) => {
    result.push([
      {
        border: [false, false, false, false],
        text: it.name,
        alignment: 'left',
        marginLeft: 5,
      },
      {
        text: 'Euro',
        alignment: 'left',
        textAlign: 'left',
        border: [false, false, false, data.tax.entries.length > 1 && index === data.tax.entries.length - 1],
      },
      {
        text: formatEUR(it.value),

        alignment: 'right',
        textAlign: 'right',
        border: [false, false, false, data.tax.entries.length > 1 && index === data.tax.entries.length - 1],
      },
    ]);
  });

  result.push([
    {
      border: [false, false],
      bold: true,
      text: 'Totale fattura',
      alignment: 'left',
      marginLeft: 5,
    },
    {
      border: [false, false, false, false],
      bold: true,
      alignment: 'left',
      textAlign: 'left',
      text: 'Euro',
    },
    {
      border: [false, false, false, false],
      bold: true,
      text: formatEUR(data.total),
      alignment: 'right',
      textAlign: 'right',
    },
  ]);

  return result;
}

function getDocDefinition(data) {
  const result = {
    content: [
      {
        style: {
          fontSize: 10,
        },
        table: {
          widths: [300, '*'],
          body: [[{ columns: [[...topHeaderBoxSender(data.sender || { address: {} })]] }, { text: ' ' }]],
        },
        layout: 'noBorders',
      },
      {
        table: {
          widths: ['*', 300],
          body: [
            [
              { text: ' ' },
              {
                textAlign: 'right',
                alignment: 'right',
                columns: [
                  [{ marginTop: 40, text: 'Spett.le' }, ...topHeaderBoxRecipient(data.recipient || { address: {} })],
                ],
              },
            ],
          ],
        },
        layout: 'noBorders',
      },
      { style: 'regime', text: getRegimeText(data.regimeType || 'ordinary') },
      {
        style: 'invoice',
        text: `Fattura n. ${pad(data.invoiceNumber, 3)}/ ${data.fiscalYear} del ${moment(data.emissionDate).format(
          dateFormat,
        )}`,
      },
      { style: 'description', text: getDescription(data) },
      { table: { widths: ['*', 30, 'auto'], body: [...getEntities(data)] } },
      { style: 'sep', text: '' },
      ...getAfterRowsText(data),
      { style: 'sep', text: '' },
      ...payment(data),
    ],
    styles: {
      title: { bold: true, fontSize: 10, fontWeight: 900, marginBottom: 6 },
      titleRecipient: { bold: true, fontSize: 12, fontWeight: 900 },
      addressLast: { marginBottom: 5 },
      regime: { fontSize: 13, bold: true, color: 'red', fontWeight: 900, marginTop: 30, marginBottom: 15 },
      redText: { fontSize: 12, color: 'red', bold: true, letterSpacing: 1.5 },
      left: { fontSize: 11 },
      right: { fontSize: 11, alignment: 'right', textAlign: 'right' },
      invoice: { fontSize: 15, fontWeight: 900, marginBottom: 15, marginTop: 15, bold: true },
      description: { marginBottom: 40 },
      boldText: { fontWeight: 900 },
      sep: { marginBottom: 30 },
    },
    pageMargins: [58, 26, 58, 26],
  };

  return result;
}

module.exports = {
  getDocDefinition,
  createPdfBinary,
};
