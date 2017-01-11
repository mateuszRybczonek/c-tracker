import Ember from 'ember';
const { Controller, computed } = Ember;

export default Controller.extend({

  queryParams: {
    sortBy: 'sort',
    searchTerm: 's',
  },

  sortBy: 'createdAtDesc',

  sortProperties: computed('sortBy', function () {
    let options = {
      'createdAtAsc': 'created_at:asc',
      'createdAtDesc': 'created_at:desc',
    };
    return options[this.get('sortBy')].split(',');
  }),

  sortedCertificates: computed.sort('matchingCertificates', 'sortProperties'),

  stickyOptions: {
  topSpacing: 40 //px, default: 0
  },

  searchTerm: '',

  matchingCertificates: computed('model@each.title', 'searchTerm', function () {
    let searchTerm = this.get('searchTerm').toLowerCase();
    return this.get('model').filter(function (certificate) {
      return certificate.get('title').toLowerCase().indexOf(searchTerm) !== -1;
    });
  }),

  actions: {
    setSorting: function (option) {
      this.set('sortBy', option);
    },
  },
});
