import Ember from 'ember';

const { Controller, computed, inject: { service } } = Ember;

export default Controller.extend({
  statsGenerator: service(),

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

  workHomeRatioPerYear: computed('statsGenerator', function() {
    return this.get('statsGenerator')
      .generateWorkHomeRatioPerYearStats(this.get('seaservices'));
  }),
});
