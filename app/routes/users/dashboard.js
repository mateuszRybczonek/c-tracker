import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    const currentUserUID = this.get('session.currentUser.uid');
    const user = this.store.peekRecord('user', currentUserUID);

    return user.get('certificates').then((certificates) => {
      return certificates;
    });
  },
});
