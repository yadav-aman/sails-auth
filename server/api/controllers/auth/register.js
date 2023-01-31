module.exports = {

  friendlyName: 'Register',

  inputs: {
    username: {
      type: 'string',
      required: true,
    },

    email: {
      type: 'string',
      required: true,
      isEmail: true,
    },

    password: {
      type: 'string',
      required: true,
    },
  },

  exits: {
    success: {
      statusCode: 201,
      description: 'User Added',
    },

    invalid: {
      statusCode: 400,
      description: 'Invalid inputs'
    },

    userExist: {
      statusCode: 409,
      description: 'User already Exists'
    }
  },

  fn: async function (inputs, exits) {
    try {
      const { username, email, password } = inputs;
      if (!username || !email || !password) {
        return exits.invalid({ message: 'Invalid inputs' });
      }
      const newUser = await User.create(inputs).intercept('E_UINQUE', 'userExist').fetch();

      sails.log.info(`User: ${newUser.email} created with user id ${newUser.id}`);

      // store user id in session
      this.req.session.userId = newUser.id;

      return exits.success(newUser);
    } catch (e) {
      if (e.code === 'E_UNIQUE') {
        if (e.attrNames.includes('email')) {
          sails.log.error(`Email: ${inputs.email} already exists`);
          return exits.userExist({ message: 'Email already exists' });
        }

        if (e.attrNames.includes('username')) {
          sails.log.error(`Username: ${inputs.username} already taken`);
          return exits.userExist({ message: 'Username already taken' });
        }
      } else if (e.code === 'E_INVALID_NEW_RECORD') {
        sails.log.error('Invalid inputs');
        return exits.invalid({ message: 'Invalid inputs' });
      }
      sails.log.error(e);
      return exits.invalid({ message: 'Something unexpected happened' });
    }
  }

};
