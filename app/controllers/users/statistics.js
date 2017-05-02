import Ember from 'ember';

const { Controller, computed, inject: { service } } = Ember;

export default Controller.extend({
  statsGenerator: service(),

  seaserviceDaysPerYear: computed('statsGenerator', function() {
    return this.get('statsGenerator')
      .seaserviceDaysPerYear(this.get('seaservices'));
  }),

  workHomeRatioPerYear: computed('statsGenerator', function() {
    return this.get('statsGenerator')
      .generateWorkHomeRatioPerYearStats(this.get('seaservices'));
  }),
});
