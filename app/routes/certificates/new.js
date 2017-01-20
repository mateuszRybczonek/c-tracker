import Ember from 'ember';
const { Route } = Ember;

export default Route.extend({

  model() {
    return this.store.createRecord('certificate');
  },

  // set controller attributes to be available in the common template
  // rendered below

  setupController: function (controller, model) {
    this._super(controller, model);

    controller.set('title', 'Add a new certificate');
    controller.set('model.user', this.get('session.currentUser.uid'));
  },

  renderTemplate() {
    this.render('certificates/form');
  },

  actions: {

    saveCertificate(newCertificate) {
      newCertificate.save().then(() => this.transitionTo('certificates'));
    },

    willTransition() {
      this._super();
      this.controller.get('model').rollbackAttributes(); //remove record from the store
    }
  }
});
