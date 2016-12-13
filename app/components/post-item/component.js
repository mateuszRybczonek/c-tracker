import Ember from 'ember';
import { convertToLineBreaks } from '../../utils/html-string-utils';

const { Component, computed } = Ember;

export default Component.extend({

  isOwner: computed('post.user', 'session.currentUser.email', function() {
    return this.get('post.user') === this.get('session.currentUser.email');
  }),

  sanitizedDescription: computed('post.description', function() {
    return convertToLineBreaks(this.get('post.description')).htmlSafe();
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
