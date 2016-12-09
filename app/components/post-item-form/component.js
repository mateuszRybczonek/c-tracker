import Ember from 'ember';

export default Ember.Component.extend({

  categories: ['Ruby on Rails', 'Ember', 'Other'],
  
  actions: {
    savePost(param) {
      this.sendAction('action', param);
    }
  }
});
