import Ember from 'ember';
const { Controller, computed } = Ember;

export default Controller.extend({

  queryParams: {
    searchTerm: 's',
  },

  stickyOptions: {
  topSpacing: 40 //px, default: 0
  },

  searchTerm: '',

  certificates: computed.alias('model'),

  matchingCertificates: computed('certificates.@each.name', 'searchTerm', function () {
    let searchTerm = this.get('searchTerm').toLowerCase();
    if (this.get('certificates')) {
      return this.get('certificates').filter(function (certificate) {
        return certificate.get('name').toLowerCase().indexOf(searchTerm) !== -1;
      });
    }
  }),

  stcwCertificates: computed.filterBy('matchingCertificates', 'type', 'STCW'),
  passports: computed.filterBy('matchingCertificates', 'type', 'Passport'),
  medicalCertificates: computed.filterBy('matchingCertificates', 'type', 'Medical'),
  endorsements: computed.filterBy('matchingCertificates', 'type', 'Endorsement'),
  other: computed.filterBy('matchingCertificates', 'type', 'Other'),

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
