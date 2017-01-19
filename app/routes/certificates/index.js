import Ember from 'ember';
const { Route } = Ember;

export default Route.extend({
  model() {
    const currentUser = this.get('session.currentUser.email');

    return this.store.findAll('certificate')
      .then(results => results.filter((certificate) => {
        return certificate.get('user') === currentUser;
      }));
  },
});
