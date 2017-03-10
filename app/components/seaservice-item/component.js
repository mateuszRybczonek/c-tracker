import Ember from 'ember';
import momentComputed from 'ember-moment/computeds/moment';
import format from 'ember-moment/computeds/format';
import { calculateDaysBetweenDates } from '../../utils/date-utils';

const { Component, computed, inject: { service } } = Ember;

export default Component.extend({

  tagName: 'tr',
  classNames: ['seaservice'],

  moment: service(),

  signOnFormatted: format((momentComputed('seaservice.signOn')), 'YYYY-MM-DD'),
  signOffFormatted: format((momentComputed('seaservice.signOff')), 'YYYY-MM-DD'),

  daysOfService: computed('seaservice.signOn', 'seaservice.signOff', function() {
    return calculateDaysBetweenDates(this.get('seaservice.signOff'), this.get('seaservice.signOn'));
  }),

  actions: {

    showPrompt() {
      this.set('showPromptDialog', true);
    },

    deleteSeaservice(seaservice) {
      seaservice.destroyRecord();
    },

    closePromptDialog() {
      this.set('showPromptDialog', false);
    },
  }
});
