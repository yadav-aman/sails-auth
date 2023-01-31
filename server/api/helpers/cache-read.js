const util = require('util');
module.exports = {


  friendlyName: 'Cache read',


  inputs: {
    key: {
      type: 'string',
      required: true,
    },
  },


  exits: {
    success: {
      description: 'All done.',
    },
  },


  fn: async function (inputs) {
    sails.log.info('reading cache', inputs);

    let data = await sails.getDatastore('redis').leaseConnection(async (db) => {
      const found = await (util.promisify(db.get).bind(db))(inputs.key);
      if (!found) {
        sails.log.warn('cache miss', inputs);
        // query the database
        const user = await User.findOne({ username: inputs.key });
        if (!user) {
          sails.log.error('user not found', inputs);
          return undefined;
        }
        // update the cache
        await sails.helpers.cacheWrite(inputs.key, JSON.stringify(user));
        return JSON.stringify(user);
      } else {
        sails.log.info('cache hit', inputs);
        return found;
      }
    });
    return data;
  }


};

