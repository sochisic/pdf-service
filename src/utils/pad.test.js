const pad = require('./pad');

describe('pad', () => {
  test('should return proper value', () => {
    expect(pad(7, 3)).toEqual('007');
  });
});
describe('pad test', () => {
  test('should return proper value 077', () => {
    expect(pad(77, 3)).toEqual('077');
  });
});
describe('pad2', () => {
  test('should return proper value 777', () => {
    expect(pad(777, 3)).toEqual('777');
  });
});
describe('pad3', () => {
  test('if second argument is missing, should return value without changes', () => {
    expect(pad(7)).toEqual(7);
  });
});
describe('pad4', () => {
  test('if second argument is NaN, should return proper value', () => {
    expect(pad(7, 'k')).toEqual(7);
  });
});
describe('pad5', () => {
  test('should return proper value 700', () => {
    expect(pad(700, 3)).toEqual('700');
  });
});
describe('pad6', () => {
  test('If NaN return without changes', () => {
    const num = '$ 700';
    expect(pad(num)).toEqual('$ 700');
  });
});
