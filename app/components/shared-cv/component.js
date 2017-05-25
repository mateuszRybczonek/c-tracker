import Ember from 'ember';

const { Component, computed } = Ember;

export default Component.extend({
  stcwCertificates: computed.filterBy('certificates', 'type', 'STCW'),
  passports: computed.filterBy('certificates', 'type', 'Passport'),
  medicalCertificates: computed.filterBy('certificates', 'type', 'Medical'),
  endorsements: computed.filterBy('certificates', 'type', 'Endorsement'),
  other: computed.filterBy('certificates', 'type', 'Other'),

  certificatesTables: computed('stcwCertificates',
    'passports',
    'medicalCertificates',
    'endorsements',
    'other', function() {
      return [
        {
          certificates: this.get('stcwCertificates'),
          title: 'STCW certificates',
          id: 'stcwCerts',
          class: '',
        }, {
          certificates: this.get('passports'),
          title: "Passports and Seaman's books",
          id: 'passports',
        }, {
          certificates: this.get('medicalCertificates'),
          title: 'Medical certificates',
          id: 'medicalCerts',
        }, {
          certificates: this.get('endorsements'),
          title: 'Endorsements',
          id: 'endorsements',
        }, {
          certificates: this.get('other'),
          title: 'Other',
          id: 'other',
        },
      ];
    }
  ),
});
