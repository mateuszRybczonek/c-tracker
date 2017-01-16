import Ember from 'ember';

const { Component, computed } = Ember;

export default Component.extend({

  queryParams: {
    sortBy: 'sort',
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

  actions: {
    setSorting: function (option) {
      this.set('sortBy', option);
    },
  },
});
