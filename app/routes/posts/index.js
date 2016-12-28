import Ember from 'ember';
const { Route } = Ember;

import wait from 'library-app/utils/wait';

export default Route.extend({
  model: function() {
    var posts = this.store.findAll('post');
    return wait(posts, 3 * 1000);
  },
});

// export default Route.extend({
//
//   model() {
//     return this.store.findAll('post');
//   },
// });
