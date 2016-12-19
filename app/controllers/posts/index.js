import Ember from 'ember';
const { Controller, computed } = Ember;

export default Controller.extend({
  sortProperties: ['created_at:desc'],
  sortedPosts: computed.sort('model', 'sortProperties'),
});
