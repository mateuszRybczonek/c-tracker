import Ember from 'ember';
import momentComputed from 'ember-moment/computeds/moment';
import format from 'ember-moment/computeds/format';

const { Component, computed, inject: { service } } = Ember;

export default Component.extend({

  tagName: 'tr',
  classNames: ['certificate'],
  classNameBindings: ['closeToExpiry'],

  moment: service(),

  expiryDateFormatted: format((momentComputed('certificate.expiryDate')), 'YYYY-MM-DD'),

  expiryDate: computed('certificate.expiryDate', function() {
    if (this.get('certificate.expiryDate') === 'n/a') {
      return 'n/a';
    } else {
      return this.get('expiryDateFormatted');
    }
  }),
});
