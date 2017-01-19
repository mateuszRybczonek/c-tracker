import Ember from 'ember';
const { Route } = Ember;

export default Route.extend({
  model() {
    return this.store.findAll('certificate')
      .then(results => results.filter((certificate) => {
        return certificate.get('user') === this.get('session.currentUser.email');
      }));
  },
});
