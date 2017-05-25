import Ember from 'ember';
const { Controller, computed } = Ember;

export default Controller.extend({
  certificates: computed.alias('model.certificates'),
  userId: computed.reads('model.id'),
});
