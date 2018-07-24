const Bar = require('./bar');
const { findBarByName } = require('.');

describe('Bar Service', () => {
  test('should get bar by name', () => {
    const bar1 = new Bar({ name: 'Jackie', surname: 'Chan' });
    const bar2 = new Bar({ name: 'Chuck', surname: 'Norris' });
    const bars = [bar1, bar2];

    expect(findBarByName(bars, 'Jackie')).toEqual(bar1);
  });
});
