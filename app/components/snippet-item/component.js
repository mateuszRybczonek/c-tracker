import Ember from 'ember';
import { addSnippetMarkdown } from '../../utils/html-string-utils';

const { Component, computed } = Ember;

export default Component.extend({
  moment: Ember.inject.service(),

  isOwner: computed('snippet.user', 'session.currentUser.email', function() {
    return this.get('snippet.user') === this.get('session.currentUser.email');
  }),

  sanitizedDescription: computed('snippet.description', function() {
    if (this.get('snippet.description')) {
      return addSnippetMarkdown(this.get('snippet.description'));
    }
  }),

  snippetIconClass: computed('snippet.category', function() {
    return this.get('snippet.category').toLowerCase().split(' ').join('-');
  }),

  actions: {

    deleteSnippet(snippet) {
      let confirmation = confirm('Are you sure?');

      if (confirmation) {
        snippet.destroyRecord();
      }
    }
  }
});
