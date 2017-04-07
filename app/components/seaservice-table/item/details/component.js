import Ember from 'ember';
import { convertToLineBreaks } from 'library-app/utils/html-string-utils';

const { Component, computed } = Ember;

export default Component.extend({

  tagName: 'table',
  classNames: ['vessel-details'],

  sanitizedVesselDetails: computed('seaservice.vesselDetails', function() {
    if (this.get('seaservice.vesselDetails')) {
      return convertToLineBreaks(this.get('seaservice.vesselDetails')).htmlSafe();
    }
  }),

  sanitizedVesselActivities: computed('seaservice.vesselActivities', function() {
    if (this.get('seaservice.vesselActivities')) {
      return convertToLineBreaks(this.get('seaservice.vesselActivities')).htmlSafe();
    }
  }),
});
