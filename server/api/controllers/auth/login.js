module.exports = {


  friendlyName: 'Login',


  description: 'Login auth.',


  inputs: {
    email: {
      type: 'string',
      required: true,
      isEmail: true,
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
    const { email, password } = inputs;
    try {
      const user = await User.findOne({ email: email.toLowerCase() });
      if (!user) {
        return exits.invalid({ message: 'User not found' });
      }
      // check password
      try {
        await sails.helpers.passwords.checkPassword(password, user.password);
      } catch (e) {
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
