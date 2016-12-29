import Ember from 'ember';

export default Ember.Component.extend({
  
  actions: {
    saveSnippet(param) {
      this.sendAction('action', param);
    }
  }
});
