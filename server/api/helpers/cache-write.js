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
    ttlInSeconds: {
      type: 'number',
      defaultsTo: -1,
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
        if (inputs.ttlInSeconds === -1) {
          await db.set(inputs.key, inputs.data);
          return;
        }
        await db.setex(inputs.key, inputs.ttlInSeconds, inputs.data);
      }
      catch (e) {
        sails.log.error(e);
      }

    });
  }


};

