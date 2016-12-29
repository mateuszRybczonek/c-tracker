import Ember from 'ember';

export default Ember.Route.extend({

  model(params) {
    return this.store.findRecord('snippet', params.snippet_id);
  },

  // set controller attributes to be available in the common template
  // rendered below

  setupController(controller, model) {
    this._super(controller, model);

    controller.set('title', 'Edit Snippet');
  },

  renderTemplate() {
    this.render('snippets/form');
  },

  actions: {

    saveSnippet(newSnippet) {
      newSnippet.updated_at = new Date();
      newSnippet.save().then(() => this.transitionTo('snippets'));
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
