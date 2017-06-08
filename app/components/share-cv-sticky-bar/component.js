import Ember from 'ember';

const { Component, computed } = Ember;

export default Component.extend({
  userId: computed.alias('session.currentUser.uid'),
});
