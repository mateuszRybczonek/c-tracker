import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({

  types: ['STCW', 'Passport', 'Medical', 'Endorsement', 'Other'],

  actions: {
    saveCertificate(certificate) {
      this.sendAction('action', certificate);
    }
  },
});
