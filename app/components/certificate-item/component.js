import Ember from 'ember';
import momentComputed from 'ember-moment/computeds/moment';
import format from 'ember-moment/computeds/format';
import { convertToLineBreaks } from '../../utils/html-string-utils';

const { Component, computed } = Ember;

export default Component.extend({
  moment: Ember.inject.service(),

  isOwner: computed('certificate.user', 'session.currentUser.email', function() {
    return this.get('certificate.user') === this.get('session.currentUser.email');
  }),

  sanitizedComment: computed('certificate.comment', function() {
    if (this.get('certificate.comment')) {
      return convertToLineBreaks(this.get('certificate.comment')).htmlSafe();
    }
  }),

  createdAtFormatted: format((momentComputed('certificate.createdAt')), 'YYYY-MM-DD'),

  actions: {

    deletePost(certificate) {
      let confirmation = confirm('Are you sure?');

      if (confirmation) {
        certificate.destroyRecord();
      }
    }
  }
});
