import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  beforeModel: function(){
    if(this.get('session.isAuthenticated')) {
      this.transitionTo('users.dashboard');
    } else {
      this.transitionTo('login');
    }
  }
});
