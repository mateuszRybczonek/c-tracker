import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    const currentUserUID = this.get('session.currentUser.uid');

    return this.store.findRecord('user', currentUserUID);
  },
});
