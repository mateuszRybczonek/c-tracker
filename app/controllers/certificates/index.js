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

  matchingCertificates: computed('model@each.name', 'searchTerm', function () {
    let searchTerm = this.get('searchTerm').toLowerCase();
    return this.get('model').filter(function (certificate) {
      return certificate.get('name').toLowerCase().indexOf(searchTerm) !== -1;
    });
  }),

  stcwCertificates: computed.filterBy('matchingCertificates', 'type', 'STCW'),
  passports: computed.filterBy('matchingCertificates', 'type', 'Passport'),
  medicalCertificates: computed.filterBy('matchingCertificates', 'type', 'Medical'),
  endorsements: computed.filterBy('matchingCertificates', 'type', 'Endorsement'),
});
