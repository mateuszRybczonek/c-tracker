import Ember from 'ember';
import momentComputed from 'ember-moment/computeds/moment';
import format from 'ember-moment/computeds/format';

const { Component, computed, inject: { service } } = Ember;

export default Component.extend({

  tagName: 'tr',
  classNames: ['seaservice'],

  moment: service(),

  signOnFormatted: format((momentComputed('seaservice.signOn')), 'YYYY-MM-DD'),
  signOffFormatted: format((momentComputed('seaservice.signOff')), 'YYYY-MM-DD'),

  daysOfService: computed('seaservice.signOn', 'seaservice.signOff', function() {
    return Math.floor((new Date(this.get('certificate.signOff')) - (new Date(this.get('certificate.signOn')) / (1000 * 3600 * 24))));
  }),
  
  actions: {

    deleteSeaservice(seaservice) {
      let confirmation = confirm('Are you sure?');

      if (confirmation) {
        seaservice.destroyRecord();
      }
    }
  }
});
