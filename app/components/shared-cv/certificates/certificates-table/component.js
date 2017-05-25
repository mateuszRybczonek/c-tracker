import Ember from 'ember';

const { Component, computed } = Ember;

export default Component.extend({

  classNames: ['common-table'],

  sortBy: 'expiryDate:asc',

  sortedCertificates: computed.sort('certificates', 'sortDefinition'),

  sortDefinition: computed('sortBy', function() {
    return [ this.get('sortBy') ];
  }),

  actions: {
    updateSorting: function (option) {
      this.set('sortBy', option);
    },
  },
});
