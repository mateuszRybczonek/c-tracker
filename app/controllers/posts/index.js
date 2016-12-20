import Ember from 'ember';
const { Controller, computed } = Ember;

export default Controller.extend({
  sortBy: 'createdAtDesc',

  sortProperties: Ember.computed('sortBy', function () {
    let options = {
      'createdAtAsc': 'created_at:asc',
      'createdAtDesc': 'created_at:desc',
    };
    return options[this.get('sortBy')].split(',');
  }),

  sortedPosts: computed.sort('model', 'sortProperties'),

  stickyOptions: {
  topSpacing: 65 //px, default: 0
  },

  actions: {
    setSorting: function (option) {
      this.set('sortBy', option);
    },
  },
});
