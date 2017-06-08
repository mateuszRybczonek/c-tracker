import Ember from 'ember';

const { Component, computed } = Ember;

export default Component.extend({
  tagName: 'tr',
  
  hoursAndDays: computed('experience.dpTime', 'experience.days', function() {
    if (this.get('experience.dpTime') !== 0) {
      return (`${this.get('experience.dpTime')} hrs / ${this.get('experience.days')} days`);
    } else {
      return `${this.get('experience.days')} days`;
    }
  }),
});
