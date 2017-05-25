import Ember from 'ember';
const { Controller, computed } = Ember;

export default Controller.extend({
  seaservice: computed.alias('model.seaservices'),
  userId: computed.reads('model.id'),
});
