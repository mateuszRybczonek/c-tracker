import Ember from 'ember';
const { Controller, computed } = Ember;

export default Controller.extend({

  seaservice: computed.alias('model'),
});
