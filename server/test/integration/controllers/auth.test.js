const supertest = require('supertest');
const assert = require('assert');

describe('Auth Controller', () => {

  describe('Login', () => {

    function makeTest(user, statusCode, password, callback) {
      it(`${statusCode === 200 ? 'Valid user' : 'Invalid user'} - should return a ${statusCode} status code`, (done) => {
        supertest(sails.hooks.http.app)
          .post('/api/auth/login')
          .send({
            emailOrUsername: user,
            password: password,
          })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(statusCode)
          .end(
            (err, res) => callback(err, res, done),
          );
      });
    }

    const validUser = ['test-user', 'test@example.com'];
    const invalidUser = ['invalid-user', 'invalid@example.com'];

    const successCallback = (err, res, done) => {
      if (err) { return done(err); }
      assert.equal(res.body.name, 'test user');
      assert.equal(res.body.username, 'test-user');
      assert.equal(res.body.bio, 'test bio');
      assert.equal(res.body.picture, 'https://api.dicebear.com/5.x/identicon/svg');
      return done();
    };

    const failCallback = (err, res, done) => {
      if (err) { return done(err); }
      assert.ok(res.body.message === 'User not found' || res.body.message === 'Invalid password');
      return done();
    };

    // correct username and password
    validUser.forEach((u) => makeTest(u, 200, 'test123', successCallback));
    // ivalid password
    validUser.forEach((u) => makeTest(u, 400, 'test321', failCallback));
    // invalid username
    invalidUser.forEach((u) => makeTest(u, 400, 'test123', failCallback));
  });

  describe('Register', () => {

    function makeTest(user, statusCode, callback) {
      it(`${statusCode === 201 ? 'Valid inputs' : statusCode === 409 ? 'Existing user' : 'Invalid Credentials'} - should return a ${statusCode} status code`,
        (done) => {
          supertest(sails.hooks.http.app)
            .post('/api/auth/register')
            .send({
              username: user.username,
              email: user.email,
              password: user.password,
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(statusCode)
            .end(
              (err, res) => callback(err, res, done),
            );
        });
    }

    const validCredentials = { username: 'test-new', email: 'test.new@example.com', password: 'test123' };
    const existingUser = [
      // existing username
      { username: 'test-new', email: 'test3@example.com', password: 'test123' },
      // existing email
      { username: 'test-2', email: 'test.new@example.com', password: 'test123' },
      // existing username and email
      { username: 'test-new', email: 'test.new@example.com', password: 'test123' }
    ];
    const invalidCredentials = [
      // invalid email
      { username: 'test', email: 'example.com', password: 'test123' },
      // invalid password
      { username: 'test', email: 'test@example.com', password: 'test' },
    ];

    // registration success
    makeTest(validCredentials, 201, (err, res, done) => {
      if (err) { return done(err); }
      assert.equal(res.body.name, '');
      assert.equal(res.body.username, 'test-new');
      assert.equal(res.body.bio, '');
      assert.equal(res.body.picture, 'https://api.dicebear.com/5.x/identicon/svg');
      return done();
    });

    // registration failure
    existingUser.forEach((u) => makeTest(u, 409, (err, res, done) => {
      if (err) { return done(err); }
      assert.ok(res.body.message === 'Username already taken' || res.body.message === 'Email already exists');
      return done();
    }));

    // invalid credentials
    invalidCredentials.forEach((u) => makeTest(u, 400, (err, res, done) => {
      if (err) { return done(err); }
      assert.equal(res.body.message, 'Invalid inputs');
      return done();
    }));

    after(async () => {
      await User.destroy({ username: 'test-new' });
    });
  });

});
