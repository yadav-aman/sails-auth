module.exports = {


  friendlyName: 'Profile',


  description: 'User profile',


  exits: {
    success: {
      statusCode: 200,
      description: 'User found and returned.',
    },
    notFound: {
      statusCode: 404,
      description: 'User not found.',
    },
    error: {
      statusCode: 500,
      description: 'Something went wrong.',
    },
  },


  fn: async function (inputs, exits) {
    try {
      const username = this.req.param('username');
      const user = await sails.helpers.cacheRead(username);
      if (!user) {
        return exits.notFound({ message: 'User not found.' });
      }
      return exits.success(user);
    } catch (e) {
      sails.log.error(e);
      return exits.error({ message: 'Something went wrong.' });
    }
  }
};
