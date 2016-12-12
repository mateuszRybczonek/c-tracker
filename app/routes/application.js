import Ember from 'ember';

const { Route, computed } = Ember;

export default Route.extend({
  beforeModel: function() {
    return this.get('session').fetch().catch(function() {
    });
  },

  isAdmin: computed ('session.currentUser.email', function() {
    return this.get('session.currentUser.email') === 'm.rybczonek@gmail.com';
  }),

  actions: {
    signIn: function(provider) {
      this.get('session').open('firebase', {
        provider: provider,
      }).then(function(data) {
        console.log(data.currentUser);
      });
    },

    signOut: function() {
      this.get('session').close();
    },
  },
});
