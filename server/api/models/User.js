/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  tableName: 'users',

  attributes: {
    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    name: {
      type: 'string',
    },
    email: {
      type: 'string',
      required: true,
      unique: true,
      regex: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,

    },
    username: {
      type: 'string',
      required: true,
      unique: true,
    },
    password: {
      type: 'string',
      minLength: 6,
    },
    picture: {
      type: 'string',
      defaultsTo: 'https://api.dicebear.com/5.x/identicon/svg',
    },
    bio: {
      type: 'string',
    }
  },

  beforeCreate: async function (valuesToSet, proceed) {
    try {
      valuesToSet.email = valuesToSet.email.toLowerCase();
      valuesToSet.username = valuesToSet.username.toLowerCase();
      // Hash password
      if (valuesToSet.password) {
        valuesToSet.password = await sails.helpers.passwords.hashPassword(valuesToSet.password);
      }
      return proceed();
    } catch (err) {
      return proceed(err);
    }

  },

  customToJSON: function () {
    return _.omit(this, ['id', 'email', 'password', 'createdAt', 'updatedAt']);
  },

  //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
  //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
  //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


  //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
  //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
};

