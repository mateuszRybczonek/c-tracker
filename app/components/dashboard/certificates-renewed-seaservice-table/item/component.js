import Ember from 'ember';
import { calculateDaysBetweenDates } from 'library-app/utils/date-utils';

const { Component, computed } = Ember;

export default Component.extend({
  tagName: 'tr',
  classNames: ['certificate'],
  classNameBindings: ['done'],

  issueDate: computed.alias('certificate.issueDate'),
  daysOfServiceToRenew: computed.alias('certificate.daysOfServiceToRenew'),
  done: computed.gte('progressRatio', 100),

  seaserviceSinceIssue: computed('issueDate', 'seaservices', 'daysOfServiceToRenew', function() {
    let seaserviceSinceIssue = [];
    this.get('seaservices').map((seaservice) => {
      if (new Date(this.get('issueDate')) <= new Date(seaservice.get('signOn'))) {
        seaserviceSinceIssue.push(
          calculateDaysBetweenDates(seaservice.get('signOff'), seaservice.get('signOn'))
        );
      }
    });
    let daysSinceIssued = seaserviceSinceIssue.reduce((a, b) => a + b, 0);
    if (daysSinceIssued >= this.get('daysOfServiceToRenew')) {
      return this.get('daysOfServiceToRenew');
    };
    return daysSinceIssued;
  }),

  progressRatio: computed('seaserviceSinceIssue', 'daysOfServiceToRenew', function() {
    return Math.ceil(this.get('seaserviceSinceIssue') / this.get('daysOfServiceToRenew') * 100);
  }),

  missingSeaservice: computed('daysOfServiceToRenew', 'seaserviceSinceIssue', function() {
    let missingDays = this.get('daysOfServiceToRenew') - this.get('seaserviceSinceIssue');
    if (missingDays < 0) {
      return 0;
    };
    return missingDays;
  }),
});
