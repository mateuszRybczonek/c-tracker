import Ember from 'ember';
import Firebase from 'firebase';

const { Route } = Ember;

export default Route.extend({
  actions: {
    signIn: function(provider) {
      this.get('session').open('firebase', {
        provider: provider,
      }).then((data) => {
        if(this.get('session.isAuthenticated')){
          let user = this.store.createRecord('user', {
            id: data.currentUser.uid,
            email: data.currentUser.email,
            certificates: [],
          });
          console.log(user);
          user.save();
          // this._checkIfUserExists(data.currentUser.uid);
        }
        this.transitionTo('users');
      });
    },
  },

  _checkIfUserExists(userId) {
    console.log(userId);
    let usersRef = new Firebase("https://c-tracker-323f8.firebaseio.com");
    usersRef.child(userId).once('value', function(snapshot) {
      let exists = (snapshot.val() !== null);
      this._userExistsCallback(userId, exists);
    });
  },

  _userExistsCallback(userId, exists) {
    if (exists) {
      alert('user ' + userId + ' exists!');
    } else {
      alert('user ' + userId + ' does not exist!');
      let user = this.store.createRecord('user', {
        id: userId,
      });
      user.save()
        .then(function () {
          this.transitionTo('users');
        });
    }
  }
});
