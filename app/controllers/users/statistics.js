import Ember from 'ember';

const { Controller, computed, inject: { service } } = Ember;

export default Controller.extend({
  statsGenerator: service(),

  miniStatsItems: [
    {
      icon: 'ship',
      header: '28 days',
      description: 'longest stay on board',
    }, {
      icon: 'ship',
      header: '28 days',
      description: 'longest stay on board',
    }, {
      icon: 'ship',
      header: '28 days',
      description: 'longest stay on board',
    }, {
      icon: 'ship',
      header: '28 days',
      description: 'longest stay on board',
    }
  ],

  seaserviceDaysPerYear: computed('statsGenerator', function() {
    return this.get('statsGenerator')
      .seaserviceDaysPerYear(this.get('seaservices'));
  }),

  workHomeRatioPerYear: computed('statsGenerator', function() {
    return this.get('statsGenerator')
      .generateWorkHomeRatioPerYearStats(this.get('seaservices'));
  }),
});
