import Ember from 'ember';
import { calculateDaysBetweenDates } from 'library-app/utils/date-utils';

const { Controller, computed } = Ember;

export default Controller.extend({

  certificatesPresent: computed.notEmpty('certificates'),

  expiringCertificates: computed('certificates', function() {
    let expiringCertificates = [];
    let daysToExpiry;
    this.get('certificates').map(function(certificate) {
      daysToExpiry = Math.floor((new Date(certificate.get('expiryDate')) - new Date()) / (1000 * 3600 * 24));
      if (daysToExpiry <= 60) {
        expiringCertificates.push(certificate);
      }
    });
    return expiringCertificates;
  }),

  expiringCertificateSortingDef: ['expiryDate:asc'],
  sortedExpiringCertificates: computed.sort('expiringCertificates', 'expiringCertificateSortingDef'),

  firstExpiringCertificate: computed('sortedExpiringCertificates', function() {
    return this.get('sortedExpiringCertificates')[0];
  }),

  certificatesRenewedBasedOnSeaservice: computed('certificates', function() {
    let certificatesRenewedBasedOnSeaservice = [];
    this.get('certificates').map(function (certificate) {
      if (certificate.get('renewedBasedOnSeaservice')) {
        certificatesRenewedBasedOnSeaservice.push(certificate);
      }
    });
    return certificatesRenewedBasedOnSeaservice;
  }),

  seaserviceSortingDef: ['signOff:desc'],
  sortedSeaservices: computed.sort('seaservices', 'seaserviceSortingDef'),

  lastSeaservice: computed('sortedSeaservices', function() {
    return this.get('sortedSeaservices')[0];
  }),

  workHomeRatioPerYear: computed('seaservices', function() {
    let workHomeRatioStats = [];
    const thisYear = new Date().getFullYear();

    for (var i = 4; i >= 0; i--) {
      this._createWorkHomeRatioStatsForYear(thisYear-i, workHomeRatioStats);
    }

    return workHomeRatioStats;
  }),

  _createWorkHomeRatioStatsForYear(year, workHomeRatioStats) {
    let seaserviceGivenYear = [];
    this.get('seaservices').map((seaservice) => {
      const signOn = new Date(seaservice.get('signOn'));
      const signOff = new Date(seaservice.get('signOff'));
      const firstDayOfTheYear = new Date(year,0,1);
      const lastDayOfTheYear = new Date(year,11,31);

      if ((signOn.getFullYear() === year) && (signOff.getFullYear() === year)) {
        seaserviceGivenYear.push(
          calculateDaysBetweenDates(signOff, signOn)
        );
      } else if ((signOn.getFullYear() !== year) && (signOff.getFullYear() === year)) {
        seaserviceGivenYear.push(
          calculateDaysBetweenDates(signOff, firstDayOfTheYear)
        );
      } else if ((signOn.getFullYear() === year) && (signOff.getFullYear() !== year)) {
        seaserviceGivenYear.push(
          calculateDaysBetweenDates(lastDayOfTheYear, signOn)
        );
      }
    });
    let result = Math.ceil(seaserviceGivenYear.reduce((a, b) => a + b, 0) / 3.65);
    workHomeRatioStats.push([year, result]);
  },
});
