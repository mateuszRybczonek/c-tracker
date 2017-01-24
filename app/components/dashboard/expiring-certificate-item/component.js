import Ember from 'ember';
import momentComputed from 'ember-moment/computeds/moment';
import format from 'ember-moment/computeds/format';
import { calculateDaysLeft } from '../../../utils/date-utils';

const { Component, computed, inject: { service } } = Ember;

export default Component.extend({

  tagName: 'tr',
  classNames: ['certificate'],

  moment: service(),

  expiryDateFormatted: format((momentComputed('certificate.expiryDate')), 'YYYY-MM-DD'),

  daysLeft: computed('certificate.expiryDate', function () {
    if (this.get('certificate.expiryDate')) {
      return calculateDaysLeft(this.get('certificate.expiryDate'));
    }
  }),

  expiryDate: computed('certificate.expiryDate', function() {
    if (this.get('certificate.expiryDate') === 'n/a') {
      return 'n/a';
    } else {
      return this.get('expiryDateFormatted');
    }
  }),
});
