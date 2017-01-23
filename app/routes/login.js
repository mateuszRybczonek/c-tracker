import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  actions: {
    signIn: function(provider) {
      this.get('session').open('firebase', {
        provider: provider,
      }).then((data) => {
        if(this.get('session.isAuthenticated')){
          let user = this.store.createRecord('user', {
            id: data.currentUser.uid,
            email: data.currentUser.email,
            certificates: [],
          });
          user.save();
        }
        this.transitionTo('users.dashboard');
      });
    },
  },
});
