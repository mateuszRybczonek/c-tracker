import Ember from 'ember';
const { Controller, computed } = Ember;

export default Controller.extend({

  isAuthenticated: computed.alias('session.isAuthenticated'),

});
