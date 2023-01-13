module.exports = {


  friendlyName: 'Google',


  description: 'Google auth.',


  inputs: {
    code: {
      type: 'string',
      required: true,
    },
  },


  exits: {
    success: {
      statusCode: 200,
      description: 'Logged in successfully',
    },
    invalid: {
      statusCode: 400,
      description: 'Error occured',
    },
  },


  fn: async function (inputs, exits) {
    try {
      const { code } = inputs;
      const GOOGLE_CLIENT_ID = sails.config.GOOGLE_CLIENT_ID;
      const GOOGLE_CLIENT_SECRET = sails.config.GOOGLE_CLIENT_SECRET;

      const { OAuth2Client } = require('google-auth-library');

      const client = new OAuth2Client(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, 'postmessage');
      const token = await client.getToken(code);
      const ticket = await client.verifyIdToken({
        idToken: token.tokens.id_token,
        audience: GOOGLE_CLIENT_ID,
      });

      const { email, name, picture } = ticket.getPayload();

      // check if user exists
      const user = await User.findOne({
        email: email.toLowerCase(),
      });

      if (!user) {
        // create user
        const newUser = await User.create({
          email: email.toLowerCase(),
          name,
          picture,
          username: email.toLowerCase(),
        }).fetch();
        // add user to session
        this.req.session.userId = newUser.id;
        return exits.success(newUser);
      } else {
        // add user to session
        this.req.session.userId = user.id;
        return exits.success(user);
      }
    } catch (e) {
      sails.log.error(e);
      return exits.invalid({ message: 'Error occured' });
    }
  }
};
