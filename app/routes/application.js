import Ember from 'ember';

const { Route, computed } = Ember;

export default Route.extend({
  beforeModel: function() {
    return this.get('session').fetch().catch(function() {
    });
  },

  actions: {
    signIn: function(provider) {
      this.get('session').open('firebase', {
        provider: provider,
      }).then(function(data) {
        console.log(data.currentUser);
        this.transitionTo('posts');
      });
    },

    signOut: function() {
      this.get('session').close();
      this.transitionTo('index');
    },
  },
});
