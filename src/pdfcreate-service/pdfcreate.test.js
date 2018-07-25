const { getDocDefinition, createPdfBinary } = require('./pdfcreate');
const { testbody } = require('./testbody');

describe('getDocDefinition', () => {
  test('should return doc definitions object', () => {
    const docDefinitions = getDocDefinition(testbody);

    expect(docDefinitions).toHaveProperty('content');
    expect(docDefinitions).toHaveProperty('styles');
  });
});
