// const PdfMakePrinter = require('pdfmake');
// const gm = require('gm');
// const path = require('path');
// const fs = require('fs');
const { getDocDefinition } = require('./pdfcreate');

// const pdfPath = path.join(__dirname, '__pdf-snapshots');
// const actualFileName = path.join(pdfPath, 'actual.pdf');
// const expectedFileName = path.join(pdfPath, 'expected.pdf');

function testbody() {
  return {
    regimeType: 'flat',
    invoiceNumber: '007',
    fiscalYear: 2018,
    emissionDate: '2018-07-20T12:15:48.320Z',
    dueDate: '2018-07-20T12:15:48.320Z',
    productivePeriodMonth: 2,
    productivePeriodYear: 2018,
    total: 32300,
    payment: {
      paymentCondition: 'pagamento a vista',
      bank: 'Unicredit – Filiale di Cefalù – Piazza Garibaldi, 2',
    },
    iban: 'IT 23 T 02008 43260 000103943030',
    recipient: {
      name: 'Tc Welfareconsulting s.r.l.',
      vatNumber: '09528651004',
      fiscalCode: 'PZZNTN22H66E1111',
      address: {
        route: 'Via Monte Bianco',
        houseNumber: '60/A',
        postalCode: '20089',
        city: 'Rozzano',
        province: 'MI',
        country: 'Italia',
      },
    },
    sender: {
      name: 'Antonio Pizzardi',
      vatNumber: '03146970961',
      fiscalCode: 'C.F. PZZNTN72H12E617O',
      address: {
        route: 'Via Carlo Cattaneo',
        houseNumber: '6',
        postalCode: '20821',
        city: 'Meda',
        province: 'MB',
        country: 'Italia',
      },
    },
    content: {
      entries: [
        {
          name: 'Anticipo provvigionale',
          value: 8424,
        },
        {
          name: 'Provvigioni maturate nel mese di gennaio 2018',
          value: 7330.71,
        },
        {
          name: 'Over provvigionali',
          value: 4847.6,
        },
      ],
      total: {
        name: 'Totale corrispettivi lordi',
        value: 20602.31,
      },
    },
    tax: {
      entries: [
        {
          name: 'Imponibile ritenuta d’acconto (50% dei corrispettivi lordi)',
          value: 10301.16,
        },
        {
          name: 'Ritenuta d’acconto 23%',
          value: -2359.27,
        },
      ],
    },
  };
}

describe('getDocDefinition', () => {
  test('should return doc definitions object and contain proper object in', () => {
    const docDefinitions = getDocDefinition(testbody());

    expect(docDefinitions).toHaveProperty('content');
    expect(docDefinitions).toHaveProperty('styles');
  });

  test('contains proper object in content array', () => {
    const docDefinitions = getDocDefinition(testbody());

    expect(docDefinitions.content).toHaveLength(14);
    expect(docDefinitions.content).toContainEqual({ style: 'invoice', text: 'Fattura n. 007/ 2018 del 20/07/2018' });
    expect(docDefinitions.content).toContainEqual({ style: 'regime', text: '{{ REGIME FORFETTARIO }}' });
    expect(docDefinitions.content).toContainEqual({
      style: 'invoice',
      text: 'Fattura n. 007/ 2018 del 20/07/2018',
    });
    expect(docDefinitions.content).toContainEqual({
      style: 'description',
      text:
        'Prestazione di servizi professionali in relazione all’inter mediazione di prodotti assicurativi ' +
        'nel mese di febbraio 2018.',
    });
  });

  // test('Testing pdf files', async () => {
  //   const fontDescriptors = {
  //     Roboto: {
  //       normal: path.join(__dirname, '../fonts/Lato-Light.ttf'),
  //       bold: path.join(__dirname, '../fonts/Lato-Regular.ttf'),
  //       italics: path.join(__dirname, '../fonts/Lato-Italic.ttf'),
  //       bolditalics: path.join(__dirname, '../fonts/Lato-BoldItalic.ttf'),
  //     },
  //   };

  //   const docDefinitions = getDocDefinition(testbody());
  //   const printer = new PdfMakePrinter(fontDescriptors);
  //   const doc = printer.createPdfKitDocument(docDefinitions);
  // await doc.pipe(fs.createWriteStream(
  //  path.join(__dirname, './__pdf-snapshots/actual.pdf')
  //  )).on('finish', () => {});
  //   doc.end();
  //   const isPdfPageEqual = (a, aPage, b, bPage) =>
  //     new Promise((resolve, reject) => {
  //       gm.compare(`${a}[${aPage}]`, `${b}[${bPage}]`, { tolerance: 0 }, (err, isEqual) => {
  //         if (err) {
  //           reject(err);
  //         }
  //         resolve(isEqual);
  //       });
  //     });
  //   return expect(await isPdfPageEqual(expectedFileName, 0, actualFileName, 0)).toBe(true);
  // });
});
