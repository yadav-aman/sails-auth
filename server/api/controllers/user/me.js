module.exports = {


  friendlyName: 'Me',


  description: 'Get my profile',

  exits: {
    success: {
      statusCode: 200,
    },
    notFound: {
      statusCode: 404,
    },
    error: {
      statusCode: 500,
    }
  },


  fn: async function (inputs, exits) {

    try {
      // Get the user id from the session.
      const userId = this.req.session.userId;
      // Get the user data.
      const user = await User.findOne({ id: userId });
      if (!user) {
        return exits.notFound({ message: 'User not found' });
      }
      return exits.success(user);
    } catch (e) {
      sails.log.error(e);
      return exits.error({ message: 'Something went wrong' });
    }
  }


};
