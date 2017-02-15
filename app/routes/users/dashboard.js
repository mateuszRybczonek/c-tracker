import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    const currentUserUID = this.get('session.currentUser.uid');
    const user = this.store.peekRecord('user', currentUserUID);

    return Ember.RSVP.hash({
      certificates: user.get('certificates'),
      seaservices: user.get('seaservices'),
    });
  },

  setupController(controller, model) {
    controller.set('certificates', model.certificates);
    controller.set('seaservices', model.seaservices);
  }
});
