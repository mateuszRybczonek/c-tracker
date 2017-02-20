import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({

  model(params) {
    return this.store.findRecord('seaservice', params.seaservice_id);
  },

  setupController(controller, model) {
    this._super(controller, model);

    controller.set('title', 'Edit Entry');
    controller.set('seaservice', model);
  },

  renderTemplate() {
    this.render('users/seaservice/form');
  },

  actions: {

    saveSeaservice(newSeaservice) {
      newSeaservice.updatedAt = new Date();
      newSeaservice.save().then(() => this.transitionTo('users.seaservice'));
    },

    willTransition(transition) {

      let model = this.controller.get('model');

      if (model.get('hasDirtyAttributes')) {
        let confirmation = confirm("Your changes haven't saved yet. Would you like to leave this form?");

        if (confirmation) {
          model.rollbackAttributes();
        } else {
          transition.abort();
        }
      }
    }
  }
});
