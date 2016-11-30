import Ember from 'ember';
const { Controller, computed } = Ember;

export default Controller.extend({

  isValid: computed.match('emailAddress', /^.+@.+\..+$/),
  isDisabled: computed.not('isValid'),

  emailAddress: '',

  actions: {

    saveInvitation() {
      alert(`Saving of the following email address is in progress: ${this.get('emailAddress')}`);
      this.set('responseMessage', `Thank you! We've just saved your email address: ${this.get('emailAddress')}`);
      this.set('emailAddress', '');
    },
    
  }
});
