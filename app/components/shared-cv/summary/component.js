import Ember from 'ember';

const { Component, computed } = Ember;

export default Component.extend({
  expiringCertificates: computed('certificates', function() {
    let expiringCertificates = [];
    let daysToExpiry;
    this.get('certificates').map(function(certificate) {
      daysToExpiry = Math.floor((new Date(certificate.get('expiryDate')) - new Date()) / (1000 * 3600 * 24));
      if (daysToExpiry <= 183) {
        expiringCertificates.push(certificate);
      }
    });
    return expiringCertificates;
  }),
});
