import Ember from 'ember';

export default Ember.Component.extend({

  types: ['STCW', 'Passport', 'Medical', 'Endorsement', 'Other'],

  actions: {
    saveCertificate(certificate) {
      this.sendAction('action', certificate);
    }
  },
});
