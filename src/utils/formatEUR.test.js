const formatEUR = require('./formatEUR');

describe('formatEUR', () => {
  test('should return proper value', () => {
    const num = 22100;
    expect(formatEUR(num)).toEqual('22.100,00');
  });
  test('should return proper value', () => {
    const num = 22100.5;
    expect(formatEUR(num)).toEqual('22.100,50');
  });
  test('should return proper value', () => {
    const num = 1200100.5;
    expect(formatEUR(num)).toEqual('1.200.100,50');
  });
  test('If NaN return without changes', () => {
    const num = '$ 1200100.50';
    expect(formatEUR(num)).toEqual('$ 1200100.50');
  });
});
