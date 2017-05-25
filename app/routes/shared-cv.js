import Ember from 'ember';

const { Route, RSVP } = Ember;

export default Route.extend({
  model( {user_id} ) {
    return this.store.findRecord('user', user_id);
  },

  setupController(controller, model) {
    this._super(controller, model);

    controller.set('certificates', model.get('certificates'));
    controller.set('seaservices', model.get('seaservices'));
  }
});
