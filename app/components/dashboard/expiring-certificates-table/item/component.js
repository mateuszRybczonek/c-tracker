import Ember from 'ember';
import { calculateDaysLeft } from 'library-app/utils/date-utils';

const { Component, computed } = Ember;

export default Component.extend({
  tagName: 'tr',
  classNames: ['certificate'],
  classNameBindings: ['expired'],

  daysLeft: computed('certificate.expiryDate', function () {
    if (this.get('certificate.expiryDate')) {
      return calculateDaysLeft(this.get('certificate.expiryDate'));
    }
  }),

  expiryDate: computed.alias('certificate.expiryDate'),

  expired: computed.equal('daysLeft', 'Expired'),
});
