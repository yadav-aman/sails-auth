module.exports = {


  friendlyName: 'Login',


  description: 'Login auth.',


  inputs: {
    emailOrUsername: {
      type: 'string',
      required: true,
    },
    password: {
      type: 'string',
      required: true,
    }
  },


  exits: {
    success: {
      statusCode: 200,
      description: 'Logged in successfully',
    },
    notFound: {
      statusCode: 404,
      description: 'User not found'
    },
    invalid: {
      statusCode: 400,
      description: 'Error occured'
    },
  },


  fn: async function (inputs, exits) {
    const { emailOrUsername, password } = inputs;
    try {
      // const sqlQuery = `SELECT * FROM users WHERE users.email = $1 OR users.username = $1`;
      // const user = await sails.sendNativeQuery(sqlQuery, [emailOrUsername.toLowerCase()]);
      // if (!user.rows.length) {
      //   return exits.invalid({ message: 'User not found' });
      // }
      const user = await User.findOne({
        or: [{
          email: emailOrUsername.toLowerCase(),
        },
        {
          username: emailOrUsername.toLowerCase()
        }]
      });
      if (!user) {
        return exits.invalid({ message: 'User not found' });
      }
      // check password
      try {
        await sails.helpers.passwords.checkPassword(password, user.password);
      } catch (e) {
        sails.log.error(e);
        return exits.invalid({ message: 'Invalid password' });
      }

      // store user id in session
      this.req.session.userId = user.id;

      return exits.success(user);
    } catch (e) {
      throw e;
    }
  }
};
