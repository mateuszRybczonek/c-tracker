import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({

  classNames: ['new-form'],

  types: ['STCW', 'Passport', 'Medical', 'Endorsement', 'Other'],

  actions: {
    saveCertificate(certificate) {
      this.sendAction('action', certificate);
    }
  },
});
