import Ember from 'ember';

const { Component, computed } = Ember;

export default Component.extend({

  sortBy: 'signOff:desc',

  sortedSeaservice: computed.sort('seaservice', 'sortDefinition'),

  sortDefinition: computed('sortBy', function() {
    return [ this.get('sortBy') ];
  }),
});
