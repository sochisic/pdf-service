const Bar = require('./bar');

describe('Bar', () => {
  test('should have these properties', () => {
    const bar = new Bar({ name: 'Jackie', surname: 'Chan' });

    expect(bar).toHaveProperty('name');
    expect(bar).toHaveProperty('surname');
  });
});
