import Ember from 'ember';
import momentComputed from 'ember-moment/computeds/moment';
import format from 'ember-moment/computeds/format';

const { Component, computed, inject: { service } } = Ember;

export default Component.extend({

  tagName: 'tr',
  classNames: ['certificate'],
  classNameBindings: ['closeToExpiry'],

  moment: service(),

  isOwner: computed('certificate.user', 'session.currentUser.uid', function() {
    return this.get('certificate.user') === this.get('session.currentUser.uid');
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

  daysToExpiry: computed('certificate.expiryDate', function() {
    return Math.floor((new Date(this.get('certificate.expiryDate')) - new Date()) / (1000 * 3600 * 24));
  }),

  closeToExpiry: computed.lt('daysToExpiry', 60),

  actions: {

    deleteCertificate(certificate) {
      let confirmation = confirm('Are you sure?');

      if (confirmation) {
        certificate.destroyRecord();
      }
    }
  }
});
