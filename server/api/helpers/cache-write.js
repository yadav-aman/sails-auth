module.exports = {


  friendlyName: 'Cache write',


  inputs: {
    key: {
      type: 'string',
      required: true,
    },
    data: {
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
    sails.log.info('writing cache', { key: inputs.key });
    await sails.getDatastore('redis').leaseConnection(async (db) => {
      try {
        await db.set(inputs.key, inputs.data);
      }
      catch (e) {
        sails.log.error(e);
      }

    });
  }


};

