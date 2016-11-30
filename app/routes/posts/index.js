import Ember from 'ember';
const { Route } = Ember;

export default Route.extend({

  model() {
    return this.store.findAll('post');
  },

  actions: {

    deletePost(post) {
      let confirmation = confirm('Are you sure?');

      if (confirmation) {
        post.destroyRecord();
      }
    }
  }
});
