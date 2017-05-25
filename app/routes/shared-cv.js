import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  model( {user_id} ) {
    return this.store.findRecord('user', user_id);
  },

  afterModel(model) {
    this.transitionTo('shared-cv.summary');
  },

  setupController(controller, model) {
    this._super(controller, model);

    controller.set('certificates', model.get('certificates'));
    controller.set('seaservices', model.get('seaservices'));
    controller.set('userId', model.get('id'));
  }
});
