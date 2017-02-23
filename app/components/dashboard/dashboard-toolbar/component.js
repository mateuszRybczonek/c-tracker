import Ember from 'ember';
import { calculateDaysBetweenDates } from '../../../utils/date-utils';

const { Component, computed } = Ember;

export default Component.extend({
  tagName: 'ul',
  classNames: ['flex-container'],

  dashboardToolbarItems: computed(
    'seaserviceLast12Months',
    'firstExpiringCert',
    'firstExpiringCertificatePresent',
    'workHomeRatio',
    'totalDPHours', function() {
      return [
        {
          class: '',
          title: 'Days on board last 12 months',
          value: this.get('seaserviceLast12Months'),
        },
        {
          class: 'small-value-text',
          title: 'First expiring certificate',
          value: this.get('firstExpiringCert'),
          visible: this.get('firstExpiringCertificatePresent'),
        },
        {
          class: '',
          title: 'Work/home ratio',
          value: this.get('workHomeRatio'),
        },
        {
          class: '',
          title: 'Total DP hours',
          value: this.get('totalDPHours'),
        },
      ];
    }) ,


  firstExpiringCertificatePresent: computed.notEmpty('firstExpiringCertificate'),

  seaserviceLast12Months: computed('seaservices', function() {
    let seaserviceLast12Months = [];
    let startDate = moment().subtract(12, 'months');
    this.get('seaservices').map((seaservice) => {
      if (startDate <= new Date(seaservice.get('signOn'))) {
        seaserviceLast12Months.push(
          calculateDaysBetweenDates(seaservice.get('signOff'), seaservice.get('signOn'))
        );
      } else if (startDate <= new Date(seaservice.get('signOff')) &&
        (startDate >= new Date(seaservice.get('signOn')))) {
          seaserviceLast12Months.push(
          calculateDaysBetweenDates(seaservice.get('signOff'), startDate)
        );
      }
    });
    return Math.ceil(seaserviceLast12Months.reduce((a, b) => a + b, 0));
  }),

  workHomeRatio: computed('seaserviceLast12Months', function() {
    return ((this.get('seaserviceLast12Months')/3.65).toFixed(0) + "%");
  }),

  totalDPHours: computed('seaservices', function() {
    let dpHoursArray = [];
    this.get('seaservices').map((seaservice) => {
      if(seaservice.timeOnDP) {
        dpHoursArray.push(seaservice.get('timeOnDP'));
      }
    });
    return dpHoursArray.reduce((a, b) => a + b, 0);
  }),

  firstExpiringCert: computed('firstExpiringCertificate', function() {
    if (this.get('firstExpiringCertificate')) {
      let certificateName = this.get('firstExpiringCertificate.name');
      let truncatedName = (function() {
        if (certificateName.length > 10) {
          return certificateName.substring(0, 10) + '...';
        } else {
          return certificateName;
        }
      })();

      return `${this.get('firstExpiringCertificate.expiryDate')} (${truncatedName})`;
    }
  }),
});
