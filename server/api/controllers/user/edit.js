module.exports = {


  friendlyName: 'Edit',


  description: 'Edit user.',


  inputs: {
    name: {
      type: 'string',
    },
    bio: {
      type: 'string',
    },
    picture: {
      type: 'string',
    }
  },


  exits: {
    success: {
      statusCode: 200,
      description: 'Profile updated successfully',
    },
    error: {
      statusCode: 500,
      description: 'Something went wrong',
    },
  },


  fn: async function (inputs, exits) {
    try {
      // Get the user id from the session.
      const userId = this.req.session.userId;

      // update profile
      await User.updateOne({ id: userId }).set({
        name: inputs.name,
        bio: inputs.bio,
        picture: inputs.picture,
      });
      return exits.success({ message: 'Profile updated successfully' });
    } catch (e) {
      sails.log.error(e);
      return exits.error({ message: 'Something went wrong' });
    }
  }


};
