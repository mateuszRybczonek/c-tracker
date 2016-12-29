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

  sortedSnippets: computed.sort('matchingSnippets', 'sortProperties'),

  stickyOptions: {
  topSpacing: 40 //px, default: 0
  },

  searchTerm: '',

  matchingSnippets: computed('model@each.description', 'searchTerm', function () {
    let searchTerm = this.get('searchTerm').toLowerCase();
    return this.get('model').filter(function (snippet) {
      return snippet.get('description').toLowerCase().indexOf(searchTerm) !== -1;
    });
  }),

  actions: {
    setSorting: function (option) {
      this.set('sortBy', option);
    },
  },
});
