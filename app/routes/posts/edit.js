import Ember from 'ember';

export default Ember.Route.extend({

  model(params) {
    return this.store.findRecord('post', params.post_id);
  },

  // set controller attributes to be available in the common template
  // rendered below

  setupController(controller, model) {
    this._super(controller, model);

    controller.set('title', 'Edit Post');
    controller.set('buttonLabel', 'Save changes');
  },

  renderTemplate() {
    this.render('posts/form');
  },

  actions: {

    savePost(newPost) {
      newPost.updated_at = new Date();
      newPost.save().then(() => this.transitionTo('posts'));
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
