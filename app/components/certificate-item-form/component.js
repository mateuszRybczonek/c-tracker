import Ember from 'ember';

export default Ember.Component.extend({
  
  actions: {
    saveCertificate(certificate) {
      this.sendAction('action', certificate);
    }
  }
});
