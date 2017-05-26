import Ember from 'ember';
import momentComputed from 'ember-moment/computeds/moment';
import format from 'ember-moment/computeds/format';
import { calculateDaysLeft } from 'library-app/utils/date-utils';

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
