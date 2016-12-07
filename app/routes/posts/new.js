import Ember from 'ember';
const { Route } = Ember;

export default Route.extend({

  model() {
    return this.store.createRecord('post');
  },

  // set controller attributes to be available in the common template
  // rendered below
  
  setupController: function (controller, model) {
    this._super(controller, model);

    controller.set('title', 'Add a new post');
    controller.set('buttonLabel', 'Add');
  },

  renderTemplate() {
    this.render('posts/form');
  },

  actions: {

    savePost(newPost) {
      newPost.save().then(() => this.transitionTo('posts'));
    },

    willTransition() {
      this._super();
      this.controller.get('model').rollbackAttributes(); //remove record from the store
    }
  }
});
