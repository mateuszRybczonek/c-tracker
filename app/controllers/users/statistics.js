import Ember from 'ember';

const { Controller, computed, inject: { service } } = Ember;

export default Controller.extend({
  statsGenerator: service(),

  miniStatsItems: computed('longestStayOnBoard', function() {
    return [
      {
        icon: 'ship',
        header: `${this.get('stayOnBoardStats.totalStay')} days`,
        description: 'total days on board',
      }, {
        icon: 'hourglass',
        header: `${this.get('stayOnBoardStats.longestStay')} days`,
        description: 'longest stay',
      }, {
        icon: 'hourglass-o',
        header: `${this.get('stayOnBoardStats.shortestStay')} days`,
        description: 'shortest stay',
      }, {
        icon: 'hourglass-half',
        header: `${this.get('stayOnBoardStats.averageStay')} days`,
        description: 'average stay',
      }
    ];
  }),

  seaserviceDaysPerYear: computed('statsGenerator', function() {
    return this.get('statsGenerator')
      .seaserviceDaysPerYear(this.get('seaservices'));
  }),

  workHomeRatioPerYear: computed('statsGenerator', function() {
    return this.get('statsGenerator')
      .generateWorkHomeRatioPerYearStats(this.get('seaservices'));
  }),

  stayOnBoardStats: computed('statsGenerator', function() {
    return this.get('statsGenerator')
      .generateStayOnBoardStats(this.get('seaservices'));
  }),
});
