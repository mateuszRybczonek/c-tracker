import Ember from 'ember';
const { Controller, computed } = Ember;

export default Controller.extend({

  isEmailValid: computed.match('emailAddress', /^.+@.+\..+$/),
  messageLength: computed('message', function() {
    return this.get('message').length
  }),
  isMessageValid: computed.gte('messageLength', 5),
  isFormValid: computed.and('isEmailValid', 'isMessageValid'),
  isDisabled: computed.not('isFormValid'),

  emailAddress: '',
  message: '',

  actions: {

    sendMessage() {
      alert(`Sending message from ${this.get('emailAddress')}, message content: ${this.get('message')}`);
      this.set('responseMessage', `Thank you! Your message has been sent`);
      this.set('emailAddress', '');
      this.set('message', '')
    },

  }
});
