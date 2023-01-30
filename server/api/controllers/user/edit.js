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
    },
    username: {
      type: 'string',
    }
  },


  exits: {
    success: {
      statusCode: 200,
      description: 'Profile updated successfully',
    },
    usernameAlreadyInUse: {
      statusCode: 409,
      description: 'Username already in use',
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

      const existingUser = await User.findOne({
        username: inputs.username,
      });

      if (existingUser && existingUser.id !== userId) {
        return exits.usernameAlreadyInUse({ message: 'Username already in use' });
      }


      // update profile
      const user = await User.updateOne({ id: userId }).set({
        username: inputs.username,
        name: inputs.name,
        bio: inputs.bio,
        picture: inputs.picture,
      });
      await sails.helpers.cacheWrite(user.username, JSON.stringify(user));
      return exits.success(user);
    } catch (e) {
      sails.log.error(e);
      return exits.error({ message: 'Something went wrong' });
    }
  }


};
