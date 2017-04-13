import Ember from 'ember';

const { Component, computed } = Ember;

export default Component.extend({
  sortBy: ['expiryDate:asc'],

  sortedCertificates: computed.sort('certificates', 'sortBy'),
});
