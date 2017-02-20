import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({

  dpClasses: [1, 2, 3],

  actions: {
    saveSeaservice(seaservice) {
      this.sendAction('action', seaservice);
    }
  },
});
