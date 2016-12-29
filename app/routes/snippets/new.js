import Ember from 'ember';
const { Route } = Ember;

export default Route.extend({

  model() {
    return this.store.createRecord('snippet');
  },

  // set controller attributes to be available in the common template
  // rendered below

  setupController: function (controller, model) {
    this._super(controller, model);

    controller.set('title', 'Create new snippet');
    controller.set('model.user', this.get('session.currentUser.email'));
  },

  renderTemplate() {
    this.render('snippets/form');
  },

  actions: {

    saveSnippet(newSnippet) {
      newSnippet.save().then(() => this.transitionTo('snippets'));
    },

    willTransition() {
      this._super();
      this.controller.get('model').rollbackAttributes(); //remove record from the store
    }
  }
});
