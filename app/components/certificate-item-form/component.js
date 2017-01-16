import Ember from 'ember';

export default Ember.Component.extend({

  types: ['STCW', 'Passport', 'Medical', 'Endorsement'],

  actions: {
    saveCertificate(certificate) {
      this.sendAction('action', certificate);
    }
  },
});
