import Ember from 'ember';
import momentComputed from 'ember-moment/computeds/moment';
import format from 'ember-moment/computeds/format';
import { convertToLineBreaks } from '../../utils/html-string-utils';

const { Component, computed } = Ember;

export default Component.extend({
  moment: Ember.inject.service(),

  isOwner: computed('post.user', 'session.currentUser.email', function() {
    return this.get('post.user') === this.get('session.currentUser.email');
  }),

  sanitizedDescription: computed('post.description', function() {
    if (this.get('post.description')) {
      return convertToLineBreaks(this.get('post.description')).htmlSafe();
    }
  }),

  updatedAtFormatted: format((momentComputed('post.updated_at')), 'MMM DD'),

  actions: {

    deletePost(post) {
      let confirmation = confirm('Are you sure?');

      if (confirmation) {
        post.destroyRecord();
      }
    }
  }
});
