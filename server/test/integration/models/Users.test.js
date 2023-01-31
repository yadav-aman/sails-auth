/* eslint-disable prefer-arrow-callback */
const assert = require('assert').strict;

describe('User Model', () => {

  describe('#create()', function () {
    it('should create a new user', async function () {
      const user = await User.create({
        name: 'mock user',
        email: 'mock@example.com',
        username: 'mock-user',
        password: 'mock123',
        bio: 'mock bio',
      }).fetch();

      // Check that the record was created.
      assert.equal(user.name, 'mock user');
      assert.equal(user.email, 'mock@example.com');
      assert.equal(user.username, 'mock-user');
      assert.equal(user.bio, 'mock bio');
      assert.equal(user.picture, 'https://api.dicebear.com/5.x/identicon/svg');
      // Check that the password was hashed.
      assert.notEqual(user.password, 'mock123');

      // Destroy the user we just created.
      await User.destroy({ username: 'mock-user' });
    });
  });

  describe('#find()', function () {
    it('should return a user', async function () {
      const user = await User.findOne({ username: 'test-user' });
      assert.equal(user.name, 'test user');
      assert.equal(user.email, 'test@example.com');
      assert.equal(user.username, 'test-user');
      assert.equal(user.bio, 'test bio');
      assert.equal(user.picture, 'https://api.dicebear.com/5.x/identicon/svg');
      assert.notEqual(user.password, 'test123');
    });
  });

  describe('#update()', function () {
    it('should update a user', async function () {
      const user = await User.updateOne({ username: 'test-user' })
        .set({
          bio: 'updated bio',
          picture: 'updated-picture',
        });
      assert.equal(user.name, 'test user');
      assert.equal(user.email, 'test@example.com');
      assert.equal(user.username, 'test-user');
      assert.equal(user.bio, 'updated bio');
      assert.equal(user.picture, 'updated-picture');
    });
  });

});
