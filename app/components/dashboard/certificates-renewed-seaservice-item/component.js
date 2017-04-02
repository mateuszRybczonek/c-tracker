import Ember from 'ember';
import { calculateDaysBetweenDates } from '../../../utils/date-utils';

const { Component, computed } = Ember;

export default Component.extend({
  tagName: 'tr',
  classNames: ['certificate'],

  issueDate: computed.alias('certificate.issueDate'),
  daysOfServiceToRenew: computed.alias('certificate.daysOfServiceToRenew'),

  seaserviceSinceIssue: computed('issueDate', 'seaservices', function() {
    let seaserviceSinceIssue = [];
    this.get('seaservices').map((seaservice) => {
      if (new Date(this.get('issueDate')) <= new Date(seaservice.get('signOn'))) {
        seaserviceSinceIssue.push(
          calculateDaysBetweenDates(seaservice.get('signOff'), seaservice.get('signOn'))
        );
      }
    });
    return seaserviceSinceIssue.reduce((a, b) => a + b, 0);
  }),

  missingSeaservice: computed('daysOfServiceToRenew', 'seaserviceSinceIssue', function() {
    return this.get('daysOfServiceToRenew') - this.get('seaserviceSinceIssue');
  }),
});
