const supertest = require('supertest');
const assert = require('assert');
let autheticatedUser;

describe('User Controller', () => {
  before((done) => {
    autheticatedUser = supertest.agent(sails.hooks.http.app);
    autheticatedUser.post('/api/auth/login')
      .send({
        emailOrUsername: 'test-user',
        password: 'test123',
      }).end((err) => {
        if (err) { return done(err); }

        return done();
      });
  });

  describe('Get User from username', () => {

    function makeTest(username, statusCode, callback) {
      it(`${statusCode === 200 ? 'Valid user' : 'Invalid user'} - should return a ${statusCode} status code`, (done) => {
        supertest(sails.hooks.http.app)
          .get(`/api/users/${username}`)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(statusCode)
          .end(
            (err, res) => callback(err, res, done),
          );
      });
    }

    // valid user
    makeTest('test-user', 200, (err, res, done) => {
      if (err) { return done(err); }
      assert.equal(res.body.name, 'test user');
      assert.equal(res.body.username, 'test-user');
      assert.equal(res.body.bio, 'test bio');
      assert.equal(res.body.picture, 'https://api.dicebear.com/5.x/identicon/svg');
      return done();
    });

    // invalid user
    makeTest('invalid-user', 404, (err, res, done) => {
      if (err) { return done(err); }
      assert.equal(res.body.message, 'User not found.');
      return done();
    });
  });

  describe('Get Me', () => {

    describe('Invalid Request', () => {
      function makeTest(statusCode, callback) {
        it(`should return a ${statusCode} status code`, (done) => {
          supertest(sails.hooks.http.app)
            .get('/api/users/me')
            .set('Accept', 'application/json')
            .expect(statusCode)
            .end(
              (err, res) => callback(err, res, done),
            );
        });
      }

      // invalid request from non logged in user
      makeTest(403, (err, res, done) => {
        if (err) { return done(err); }
        return done();
      });
    });

    describe('Valid Request', () => {

      it('should return a 200 status code', (done) => {
        autheticatedUser.get('/api/users/me')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(
            (err, res) => {
              if (err) { return done(err); }
              assert.equal(res.body.name, 'test user');
              assert.equal(res.body.username, 'test-user');
              assert.equal(res.body.bio, 'test bio');
              assert.equal(res.body.picture, 'https://api.dicebear.com/5.x/identicon/svg');
              return done();
            },
          );
      });
    });
  });

  describe('Edit Me', () => {

    describe('Invalid Request', () => {
      function makeTest(statusCode, callback) {
        it(`should return a ${statusCode} status code`, (done) => {
          supertest(sails.hooks.http.app)
            .post('/api/users/profile')
            .send({
              name: 'new name',
              bio: 'new bio',
              picture: 'new picture',
            })
            .set('Accept', 'application/json')
            .expect(statusCode)
            .end(
              (err, res) => callback(err, res, done),
            );
        });
      }

      // invalid request from non logged in user
      makeTest(403, (err, res, done) => {
        if (err) { return done(err); }
        return done();
      });
    });

    describe('Valid Request', () => {

      it('should return a 200 status code', (done) => {
        autheticatedUser.post('/api/users/profile')
          .send({
            username: 'test-user',
            name: 'new name',
            bio: 'new bio',
            picture: 'new picture',
          })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(
            (err, res) => {
              if (err) { return done(err); }
              assert.equal(res.body.name, 'new name');
              assert.equal(res.body.username, 'test-user');
              assert.equal(res.body.bio, 'new bio');
              assert.equal(res.body.picture, 'new picture');
              return done();
            },
          );
      });

      after((done) => {
        autheticatedUser.post('/api/users/profile')
          .send({
            username: 'test-user',
            name: 'test user',
            bio: 'test bio',
            picture: 'https://api.dicebear.com/5.x/identicon/svg',
          })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(
            (err) => {
              if (err) { return done(err); }
              return done();
            },
          );
      });
    });
  });

  after(async () => {
    // clear cache
    await sails.helpers.cacheWrite('test-user', 'test', 1);
    await new Promise((resolve) => setTimeout(resolve, 1000));
  });
});
