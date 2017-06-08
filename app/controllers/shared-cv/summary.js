import Ember from 'ember';
const { Controller, computed } = Ember;

export default Controller.extend({
  certificates: computed.reads('model.certificates'),
  seaservices: computed.reads('model.seaservices'),
  userId: computed.reads('model.id'),
});
