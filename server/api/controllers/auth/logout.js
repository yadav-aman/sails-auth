module.exports = {


  friendlyName: 'Logout',


  description: 'Logout auth.',


  exits: {

    success: {
      description: 'The requesting user agent has been successfully logged out.'
    },

    redirect: {
      description: 'The requesting user agent looks to be a web browser.',
      extendedDescription: 'After logging out from a web browser, the user is redirected away.',
      responseType: 'redirect'
    }

  },


  fn: async function () {

    delete this.req.session.userId;

    return this.req.wantsJSON ? { message: 'Logged out successfully' } : this.res.redirect('/');

  }


};
