import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({

  model(params) {
    return this.store.findRecord('certificate', params.certificate_id);
  },

  // set controller attributes to be available in the common template
  // rendered below

  setupController(controller, model) {
    this._super(controller, model);

    controller.set('title', 'Edit Certificate');
    controller.set('certificate', model);
  },

  renderTemplate() {
    this.render('users/certificates/form');
  },

  actions: {

    saveCertificate(newCertificate) {
      newCertificate.updatedAt = new Date();
      newCertificate.save().then(() => this.transitionTo('users.certificates'));
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
