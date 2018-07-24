const MockDate = require('mockdate');

describe('This is a BDD test suite', () => {
  beforeAll(() => {
    MockDate.set(new Date('2018-08-01T00:00:00.000Z'), 0);
  });

  afterAll(async () => {
    MockDate.reset();
  });

  test('today is today', async () => {
    expect(new Date(Date.now())).toMatchSnapshot();
  });
});
