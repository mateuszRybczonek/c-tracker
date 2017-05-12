import Ember from 'ember';

const { Route, RSVP } = Ember;

export default Route.extend({
  model() {
    const currentUserUID = this.get('session.currentUser.uid');
    const user = this.store.peekRecord('user', currentUserUID);

    return RSVP.hash({
      certificates: user.get('certificates'),
      seaservices: user.get('seaservices'),
    });
  },

  setupController(controller, model) {
    this._super(controller, model);

    controller.set('certificates', model.certificates);
    controller.set('seaservices', model.seaservices);
  }
});
