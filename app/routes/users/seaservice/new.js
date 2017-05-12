import Ember from 'ember';

const { Route, RSVP } = Ember;

export default Route.extend({

  model() {
    return RSVP.hash({
      user: this.store.findRecord('user', this.get('session.currentUser.uid')),
      newSeaservice: this.store.createRecord('seaservice'),
    });
  },
  
  setupController: function (controller, model) {
    this._super(controller, model);

    controller.set('title', 'Add a new entry');
    controller.set('seaservice', model.newSeaservice);
  },

  renderTemplate() {
    this.render('users/seaservice/form');
  },

  actions: {

    saveSeaservice(newSeaservice) {
      let user = this.controller.get('model.user');
      newSeaservice.set('user', user);
      newSeaservice.save().then(() => {
        user.get('seaservices').pushObject(newSeaservice);
        user.save();
        this.transitionTo('users.seaservice');
      });
    },

    willTransition() {
      this._super();
      this.controller.get('seaservice').rollbackAttributes();
    }
  }
});
