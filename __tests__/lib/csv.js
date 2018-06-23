/* global describe: true, test: true, expect: true */
const { getSchema } = require('../../lib/csv');


describe('csv', () => {
  test('readCSV', async () => {
    const data = ['one (S)', '2 (N)', 'three (S)'];
    const schema = getSchema(data);
    schema.forEach((item) => {
      expect(item).toHaveProperty('name');
      expect(item).toHaveProperty('type');
    });
  });
});
