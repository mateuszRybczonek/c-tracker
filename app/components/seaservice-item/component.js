import Ember from 'ember';
import momentComputed from 'ember-moment/computeds/moment';
import format from 'ember-moment/computeds/format';
import { calculateDaysBetweenDates } from '../../utils/date-utils';

const { Component, computed, inject: { service } } = Ember;

export default Component.extend({

  tagName: 'tr',
  classNames: ['seaservice'],

  moment: service(),

  signOn: computed.alias('seaservice.signOn'),
  signOff: computed.alias('seaservice.signOff'),

  signOnFormatted: format((momentComputed('signOn')), 'YYYY-MM-DD'),
  signOffFormatted: format((momentComputed('signOff')), 'YYYY-MM-DD'),

  daysOfService: computed('signOn', 'signOff', 'validDates', function() {
    if (this.get('validDates')) {
      return calculateDaysBetweenDates(this.get('signOff'), this.get('signOn'));
    } else {
      return 'Invalid dates';
    }
  }),

  validDates: computed('signOff', 'signOn', function() {
    if (this.get('signOn') && this.get('signOff')) {
      return (new Date(this.get('signOn')) < new Date(this.get('signOff')));
    }
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
