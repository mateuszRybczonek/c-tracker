import Ember from 'ember';
const { Route } = Ember;

export default Route.extend({
  model() {
    const currentUserUID = this.get('session.currentUser.uid');

    return this.store.findAll('certificate')
      .then(results => results.filter((certificate) => {
        return certificate.get('user') === currentUserUID;
      }));
  },
});
