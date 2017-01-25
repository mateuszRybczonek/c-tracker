import Ember from 'ember';

export default Ember.Component.extend({
  
  actions: {
    saveSeaservice(seaservice) {
      this.sendAction('action', seaservice);
    }
  },
});
