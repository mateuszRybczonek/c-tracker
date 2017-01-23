import Ember from 'ember';
const { Route, RSVP } = Ember;

export default Route.extend({

  model() {

    return RSVP.hash({
      user: this.store.findRecord('user', this.get('session.currentUser.uid')),
      newCertificate: this.store.createRecord('certificate'),
    })
  },

  // set controller attributes to be available in the common template
  // rendered below

  setupController: function (controller, model) {
    this._super(controller, model);

    controller.set('title', 'Add a new certificate');
  },

  renderTemplate() {
    this.render('users/certificates/form');
  },

  actions: {

    saveCertificate(newCertificate) {
      newCertificate.save().then(() => {
        let user = this.controller.get('model.user');
        console.log(user);
        debugger;
        user.get('certificates').pushObject(newCertificate);
        user.save();
        this.transitionTo('users.certificates');
      });
    },

    willTransition() {
      this._super();
      this.controller.get('model.newCertificate').rollbackAttributes(); //remove record from the store
    }
  }
});
