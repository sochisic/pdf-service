const formatEUR = require('./format-eur');

describe('formatEUR', () => {
  test('should return proper value 22.100,00', () => {
    const num = 22100;
    expect(formatEUR(num)).toEqual('22.100,00');
  });
});
describe('formatEUR test2', () => {
  test('should return proper value 22.100,50', () => {
    const num = 22100.5;
    expect(formatEUR(num)).toEqual('22.100,50');
  });
});
describe('formatEUR test3', () => {
  test('should return proper value 1.200.100,50', () => {
    const num = 1200100.5;
    expect(formatEUR(num)).toEqual('1.200.100,50');
  });
});
describe('formatEUR test4', () => {
  test('should return proper value 1.000,00', () => {
    const num = 1000;
    expect(formatEUR(num)).toEqual('1.000,00');
  });
});
describe('formatEUR test5', () => {
  test('should return proper value 1.000,50', () => {
    const num = 1000.5;
    expect(formatEUR(num)).toEqual('1.000,50');
  });
});
describe('formatEUR test6', () => {
  test('If NaN return without changes', () => {
    const num = '$ 1200100.50';
    expect(formatEUR(num)).toEqual('$ 1200100.50');
  });
});
