import Ember from 'ember';
const { Route } = Ember;

export default Route.extend({

  model() {
    return this.store.createRecord('post');
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
