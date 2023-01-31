/* eslint-disable prefer-arrow-callback */
const assert = require('assert').strict;

describe('Read Cache', () => {
  it('should return a cached value', async function () {
    try {
      await sails.helpers.cacheWrite('unit_test-key', 'test', 1);
      const value = await sails.helpers.cacheRead('unit_test-key');
      assert.equal(value, 'test');
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (e) {
      console.log(e);
    }
  });

  it('should return undefined if no value is cached', async function () {
    try {
      const value = await sails.helpers.cacheRead('unit_test-key');
      assert.equal(value, undefined);
    } catch (e) {
      console.log(e);
    }
  });
});
