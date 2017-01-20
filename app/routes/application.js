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
      }).then((data) => {
        console.log(data.currentUser);
        this.transitionTo('dashboard');
      });
    },

    signOut: function() {
      this.get('session').close().then(() => {
        console.log('from then');
        this.transitionTo('index');
      });
    },
  },
});
