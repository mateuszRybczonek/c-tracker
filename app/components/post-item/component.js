import Ember from 'ember';

const { Component, computed } = Ember

export default Component.extend({

  isOwner: computed('post.user', 'session.currentUser.email', function() {
    return this.get('post.user') === this.get('session.currentUser.email')
  }),

  actions: {

    deletePost(post) {
      let confirmation = confirm('Are you sure?');

      if (confirmation) {
        post.destroyRecord();
      }
    }
  }
});
