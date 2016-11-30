import Ember from 'ember';
const { Controller, computed } = Ember;

export default Controller.extend({

  responseMessage: '',
  emailAddress: '',

  isValid: computed.match('emailAddress', /^.+@.+\..+$/),
  isDisabled: computed.not('isValid'),

  actions: {

    saveInvitation() {
      const email = this.get('emailAddress');

      const newInvitation = this.store.createRecord('invitation', { email: email });
      newInvitation.save();

      this.set('responseMessage', `Thank you! We've just saved your email address: ${this.get('emailAddress')}`);
      this.set('emailAddress', '');
    },
  }
});
