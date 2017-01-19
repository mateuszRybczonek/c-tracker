import Ember from 'ember';
import momentComputed from 'ember-moment/computeds/moment';
import format from 'ember-moment/computeds/format';

const { Component, computed, inject: { service } } = Ember;

export default Component.extend({

  tagName: 'tr',
  classNames: ['certificate'],

  moment: service(),

  isOwner: computed('certificate.user', 'session.currentUser.email', function() {
    return this.get('certificate.user') === this.get('session.currentUser.email');
  }),

  createdAtFormatted: format((momentComputed('certificate.createdAt')), 'YYYY-MM-DD'),
  issueDateFormatted: format((momentComputed('certificate.issueDate')), 'YYYY-MM-DD'),
  expiryDateFormatted: format((momentComputed('certificate.expiryDate')), 'YYYY-MM-DD'),

  expiryDate: computed('certificate.expiryDate', function() {
    if (this.get('certificate.expiryDate') === 'n/a') {
      return 'n/a';
    } else {
      return this.get('expiryDateFormatted');
    }
  }),
  
  actions: {

    deleteCertificate(certificate) {
      let confirmation = confirm('Are you sure?');

      if (confirmation) {
        certificate.destroyRecord();
      }
    }
  }
});
