import Ember from 'ember';
const { Controller, computed } = Ember;

export default Controller.extend({

  queryParams: {
    sortBy: 'sort',
    searchTerm: 's',
  },

  sortBy: 'expiryDateDesc',

  sortProperties: computed('sortBy', function () {
    let options = {
      'expiryDateAsc': 'expiryDate:asc',
      'expiryDateDesc': 'expiryDate:desc',
    };
    return options[this.get('sortBy')].split(',');
  }),

  sortedCertificates: computed.sort('matchingCertificates', 'sortProperties'),

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

  actions: {
    setSorting: function (option) {
      this.set('sortBy', option);
    },
  },
});
