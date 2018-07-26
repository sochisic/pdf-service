const pad = require('./pad');

describe('pad', () => {
  test('should return proper value', () => {
    expect(pad(7, 3)).toEqual('007');
  });
  test('should return proper value', () => {
    expect(pad(77, 3)).toEqual('077');
  });
  test('should return proper value', () => {
    expect(pad(777, 3)).toEqual('777');
  });
  test('should return proper value', () => {
    expect(pad(7)).toEqual(7);
  });
  test('should return proper value', () => {
    expect(pad(7, 'k')).toEqual(7);
  });
  test('If NaN return without changes', () => {
    const num = '$ 700';
    expect(pad(num)).toEqual('$ 700');
  });
});
