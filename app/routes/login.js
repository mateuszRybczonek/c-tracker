import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  actions: {
    signIn: function(provider) {
      this.get('session').open('firebase', {
        provider: provider,
      }).then(() => {
        this.transitionTo('users').bind(this);
      });
    },
  },
});
