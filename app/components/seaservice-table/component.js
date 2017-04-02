import Ember from 'ember';

const { Component, computed } = Ember;

export default Component.extend({

  classNames: ['common-table'],

  sortDefinition: ['signOff:desc'],

  sortedSeaservice: computed.sort('seaservice', 'sortDefinition'),
});
