import Ember from 'ember';
const { Controller, computed } = Ember;

export default Controller.extend({

  isEmailValid: computed.match('emailAddress', /^.+@.+\..+$/),
  isMessageValid: computed('message', function() {
    return (this.get('message').length >= 5);
  }),
  isFormValid: computed.and('isEmailValid', 'isMessageValid'),
  isDisabled: computed.not('isFormValid'),

  emailAddress: '',
  message: '',

  actions: {

    sendMessage() {
      const email = this.get('emailAddress');
      const message = this.get('message');

      const newContact = this.store.createRecord('contact', {
        email: email,
        message: message,
      });

      newContact.save().then(() => {
        this.set('responseMessage', `Thank you! Your message has been sent`);
        this.set('emailAddress', '');
        this.set('message', '');
      });
    },

  }
});
