/* eslint-disable prefer-arrow-callback */
const sails = require('sails');

// Before running any tests...
before(function (done) {

  // Increase the Mocha timeout so that Sails has enough time to lift, even if you have a bunch of assets.
  this.timeout(5000);

  sails.lift({
    // Your Sails app's configuration files will be loaded automatically,
    // but you can also specify any other special overrides here for testing purposes.

    // For example, we might want to skip the Grunt hook,
    // and disable all logs except errors and warnings:
    hooks: { grunt: false },
    log: { level: 'silent' },

  }, function (err) {
    if (err) { return done(err); }

    // add user to database
    User.create({
      name: 'test user',
      email: 'test@example.com',
      username: 'test-user',
      password: 'test123',
      bio: 'test bio',
    }, () =>
      done());
  });
});

// After all tests have finished...
after(function (done) {

  // destroy user
  User.destroy({ username: 'test-user' }, () => {
    sails.lower(done);
  });

});
