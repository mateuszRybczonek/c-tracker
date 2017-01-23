import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  beforeModel: function() {
    return this.get('session').fetch().catch(function() {});
  },

  actions: {
    signIn: function(provider) {
      this.get('session').open('firebase', {
        provider: provider,
      }).then(() => {
        this.transitionTo('users').bind(this);
      });
    },

    signOut: function() {
      this.get('session').close().then(() => {
        this.transitionTo('index');
      });
    },
  },
});
