const pdfMakePrinter = require('pdfmake');
const path = require('path');
const fs = require('fs');
const { getDocDefinition } = require('./pdfcreate');
const gm = require('gm');

const pdfPath = path.join(__dirname, '__pdf-snapshots');
const actualFileName = path.join(pdfPath, 'actual.pdf');
const expectedFileName = path.join(pdfPath, 'expected.pdf');

describe('getDocDefinition', () => {
  test('should return doc definitions object and contain proper object in', () => {
    const docDefinitions = getDocDefinition(testbody());

    expect(docDefinitions).toHaveProperty('content');
    expect(docDefinitions).toHaveProperty('styles');
  });

  test('contains proper object in content array', () => {
    const docDefinitions = getDocDefinition(testbody());

    expect(docDefinitions.content).toHaveLength(15);
    expect(docDefinitions.content).toContainEqual({ style: 'invoice', text: 'Fattura n. 007/ 2018 del 20/07/2018' });
    expect(docDefinitions.content).toContainEqual({
      text:
        'Compenso non assoggettato a ritenuta d’acconto ai sensi dell’art. 27 del D.L. n. 98 del 06.07.2011 Operazione effettuata da soggetto appartenente a regime fiscale di vantaggio per l’imprenditoria giovanile e per i lavoratori in mobilità ai sensi dell’art. 27, commi 1 e 2, del D.L. n. 98 del 06.07.2011 Imposta di bollo assolta sull’originale',
    });
    expect(docDefinitions.content).toContainEqual({ bold: true, text: 'Scadenza fattura:  20/07/2018' });
    expect(docDefinitions.content).toContainEqual({ text: 'Codice IBAN: IT 23 T 02008 43260 000103943030' });
    expect(docDefinitions.content).toContainEqual({ text: 'Condizioni di pagamento: pagamento a vista' });
    expect(docDefinitions.content).toContainEqual({
      style: 'redText',
      text: ' {{ OBBLIGATORIA SE FATTURA SUPERA I 77,47€ }}',
    });
    expect(docDefinitions.content).toContainEqual({
      text: 'Banca d’appoggio:  Unicredit – Filiale di Cefalù – Piazza Garibaldi, 2',
    });
  });
  test('Testing pdf files', async () => {
    const fontDescriptors = {
      Roboto: {
        normal: path.join(__dirname, '../fonts/Roboto-Regular.ttf'),
        bold: path.join(__dirname, '../fonts/Roboto-Medium.ttf'),
        italics: path.join(__dirname, '../fonts/Roboto-Italic.ttf'),
        bolditalics: path.join(__dirname, '../fonts/Roboto-MediumItalic.ttf'),
      },
    };

    const docDefinitions = getDocDefinition(testbody());
    const printer = new pdfMakePrinter(fontDescriptors);
    const doc = printer.createPdfKitDocument(docDefinitions);

    await doc.pipe(fs.createWriteStream(path.join(__dirname, './__pdf-snapshots/actual.pdf'))).on('finish', () => {});
    doc.end();

    const isPdfPageEqual = (a, aPage, b, bPage) =>
      new Promise((resolve, reject) => {
        gm.compare(`${a}[${aPage}]`, `${b}[${bPage}]`, { tolerance: 0 }, (err, isEqual, equality) => {
          if (err) {
            reject(err);
          }

          resolve(isEqual);
        });
      });

    return expect(await isPdfPageEqual(expectedFileName, 0, actualFileName, 0)).toBe(true);
  });
});

function testbody() {
  return {
    regimeType: 'minimum',
    invoiceNumber: 7,
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
      vatNumber: 'P.IVA 09528651004',
      fiscalCode: 'C.F. PZZNTN72H12E617O',
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
      vatNumber: 'P.IVA 03146970961',
      fiscalCode: 'C.F. PZZNTN72H12E617O',
      address: {
        route: 'Via Carlo Cattaneo',
        houseNumber: '60/A',
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
          value: 84000024,
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
