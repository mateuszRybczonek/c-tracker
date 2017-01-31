import Ember from 'ember';

const { Controller, computed } = Ember;

export default Controller.extend({

  certificates: computed.alias('model'),

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

  firstExpiringCertificate: computed('expiringCertificates', function() {
    const sortedExpiringCerts = this.get('expiringCertificates').sort(function(a, b) {
      return a.expiryDate > b.expiryDate;
    });
    return sortedExpiringCerts[0];
  }),

  certificatesRenewedBasedOnSeaservice: computed('certificates', function() {
    let certificatesRenewedBasedOnSeaservice = [];
    this.get('certificates').map(function(certificate) {
      if (certificate.get('renewedBasedOnSeaservice')) {
        certificatesRenewedBasedOnSeaservice.push(certificate);
      }
    });
    return certificatesRenewedBasedOnSeaservice;
  }),
});
