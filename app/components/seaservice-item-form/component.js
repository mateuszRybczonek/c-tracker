import Ember from 'ember';

export default Ember.Component.extend({

  dpClasses: [1, 2, 3],

  actions: {
    saveSeaservice(seaservice) {
      this.sendAction('action', seaservice);
    }
  },
});
