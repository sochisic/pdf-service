const { getDocDefinition, createPdfBinary } = require('./pdfcreate');

describe('getDocDefinition', () => {
  test('should return doc definitions object', () => {
    const docDefinitions = getDocDefinition(testbody());

    expect(docDefinitions).toHaveProperty('content');
    expect(docDefinitions).toHaveProperty('styles');
  });
});

function testbody() {
  return {
    regimeType: 'minimum',
    invoiceNumber: '007',
    fiscalYear: 2000,
    emissionDate: '2018-07-20T12:15:48.320Z',
    dueDate: '2018-07-20T12:15:48.320Z',
    productivePeriodMonth: 2,
    productivePeriodYear: 2015,
    total: 1000000,
    payment: {
      paymentCondition: 'pagamento a vista',
      bank: 'Unicredit – Filiale di Cefalù – Piazza Garibaldi, 2',
    },
    iban: 'IT 23 T 02008 43260 000103943030',
    recipient: {
      name: 'Spett.le',
      vatNumber: '09528651004',
      fiscalCode: 'P.IVA e C.F.',
      address: {
        route: 'Via Monte Bianco,',
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
        route: 'Via Carlo Cattaneo, 6',
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
          name: 'row1',
          value: 8424.0,
        },
        {
          name: 'row1',
          value: 7330.71,
        },
        {
          name: 'row1',
          value: 4847.6,
        },
        {
          name: 'row1',
          value: 21200.12,
        },
        {
          name: 'row1',
          value: 12000.12,
        },
        {
          name: 'row1',
          value: 21200.12,
        },
        {
          name: 'row1',
          value: 21200.12,
        },
        {
          name: 'row1',
          value: 2120.12,
        },
        {
          name: 'row1',
          value: 212000.12,
        },
        {
          name: 'row1',
          value: 212000.12,
        },
        {
          name: 'row1',
          value: 212000.12,
        },
        {
          name: 'row1',
          value: 4847.6,
        },
        {
          name: 'row1',
          value: 21200.12,
        },
        {
          name: 'row1',
          value: 12000.12,
        },
        {
          name: 'row1',
          value: 21200.12,
        },
        {
          name: 'row1',
          value: 21200.12,
        },
        {
          name: 'row1',
          value: 2120.12,
        },
        {
          name: 'row1',
          value: 212000.12,
        },
        {
          name: 'row1',
          value: 212000.12,
        },
        {
          name: 'row1',
          value: 212000.12,
        },
        {
          name: 'row1',
          value: 8424.0,
        },
        {
          name: 'row1',
          value: 7330.71,
        },
        {
          name: 'row1',
          value: 4847.6,
        },
        {
          name: 'row1',
          value: 21200.12,
        },
        {
          name: 'row1',
          value: 12000.12,
        },
      ],
      total: {
        name: 'Total without tax',
        value: 20602.31,
      },
    },
    tax: {
      entries: [
        {
          name: 'tax1',
          value: 121212,
        },
        {
          name: 'tax2',
          value: 121212,
        },
      ],
    },
  };
}
