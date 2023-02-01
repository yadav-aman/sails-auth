/* eslint-disable prefer-arrow-callback */
const assert = require('assert').strict;

describe('Write Cache', () => {
  it('should write a value to the cache', async function () {
    await sails.helpers.cacheWrite('unit_test-key-inf', 'test');
    const value = await sails.helpers.cacheRead('unit_test-key-inf');
    assert.equal(value, 'test');
  });

  it('should write a value to the cache with a ttl', async function () {
    await sails.helpers.cacheWrite('unit_test-key', 'test', 1);
    const value = await sails.helpers.cacheRead('unit_test-key');
    assert.equal(value, 'test');
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const value2 = await sails.helpers.cacheRead('unit_test-key');
    assert.equal(value2, undefined);
  });

  after(async () => {
    await sails.helpers.cacheWrite('unit_test-key-inf', 'test', 1);
    await new Promise((resolve) => setTimeout(resolve, 1000));
  });
});
