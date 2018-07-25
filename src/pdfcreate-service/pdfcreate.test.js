const { getDocDefinition, createPdfBinary } = require('./pdfcreate');
const { testbody } = require('./testbody');

describe('getDocDefinition', () => {
  test('should return doc definitions object', () => {
    const docDefinitions = getDocDefinition(testbody);

    expect(docDefinitions).toHaveProperty('content');
    expect(docDefinitions).toHaveProperty('styles');
  });
});

// describe('Bar', () => {
//   test('should have these properties', () => {
//     const bar = new Bar({ name: 'Jackie', surname: 'Chan' });

//     expect(bar).toHaveProperty('name');
//     expect(bar).toHaveProperty('surname');
//   });
// });
