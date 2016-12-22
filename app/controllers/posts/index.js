import Ember from 'ember';
const { Controller, computed } = Ember;

export default Controller.extend({

  queryParams: {
    sortBy: 'sort',
    searchTerm: 's',
  },

  sortBy: 'createdAtDesc',

  sortProperties: computed('sortBy', function () {
    let options = {
      'createdAtAsc': 'created_at:asc',
      'createdAtDesc': 'created_at:desc',
    };
    return options[this.get('sortBy')].split(',');
  }),

  sortedPosts: computed.sort('matchingPosts', 'sortProperties'),

  stickyOptions: {
  topSpacing: 40 //px, default: 0
  },

  searchTerm: '',

  matchingPosts: computed('model@each.title', 'searchTerm', function () {
    let searchTerm = this.get('searchTerm').toLowerCase();
    return this.get('model').filter(function (post) {
      return post.get('title').toLowerCase().indexOf(searchTerm) !== -1;
    });
  }),

  actions: {
    setSorting: function (option) {
      this.set('sortBy', option);
    },
  },
});
