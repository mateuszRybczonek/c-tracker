import Ember from 'ember';

const { Component, computed } = Ember;

export default Component.extend({

  sortBy: ['expiryDate:desc'],

  sortedCertificates: computed.sort('certificates', 'sortBy'),
});
