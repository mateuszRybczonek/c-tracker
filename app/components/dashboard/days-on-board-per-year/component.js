import Ember from 'ember';
import colorPalette from 'library-app/consts/color-palette';
import { calculateDaysBetweenDates } from 'library-app/utils/date-utils';
import { task } from 'ember-concurrency';

const { DARK_GREY } = colorPalette;
const { Component, computed, observer, inject: { service } } = Ember;

export default Component.extend({
  lazyLoader: service(),

  seaserviceDaysPerYear: computed('seaservices', function() {
    let seaserviceStats = [];
    const thisYear = new Date().getFullYear();

    for (var i = 4; i >= 0; i--) {
      this._createSeaserviceStatsForYear(thisYear-i, seaserviceStats);
    }

    return seaserviceStats;
  }),

  graphLoading: computed('graph.{loaded,error}', function() {
    return !(this.get('graph.loaded') || this.get('graph.error'));
  }),

  showGraph: computed('graph.error', 'graphLoading', function() {
    return !(this.get('graph.error') || this.get('graphLoading'));
  }),

  drawGraph: observer('seaserviceDaysPerYear', function() {
    this.drawChart();
  }),

  init() {
    this._super(...arguments);
    this.setProperties({
      seaserviceDaysPerYear: this.get('seaserviceDaysPerYear') || [],
      graph: this.get('graph') || {
        loaded: false,
        error: false,
      },
    });
  },

  didInsertElement() {
    this._super(...arguments);
    this.prepareChart();
  },

  chartElementPresent() {
    return this.$('#yearly-days-chart').length > 0;
  },

  drawChart() {
    const seaserviceDaysPerYear = this.get('seaserviceDaysPerYear');

    if (!this.chartElementPresent()) {
      return;
    }

    window.nv.addGraph(function() {
      const chart = window.nv.models.discreteBarChart()
        .x((d) => d[0])
        .y((d) => d[1])
        .showValues(true)
        .showYAxis(false)
        .color([DARK_GREY])
        .margin({ left: 0, top: 20, bottom: 30, right: 0 });

      chart.tooltip.enabled(false);
      chart.duration(2000);
      chart.xAxis.tickPadding(18).tickFormat(window.d3.format('d'));
      chart.yAxis.axisLabel('Days')
        .tickFormat((d) => `${window.d3.format(',f')(d)} days`);

      chart.valueFormat((d) => `${window.d3.format()(d)} days`);
      window.d3.select('#yearly-days-chart svg').datum([{
        values: seaserviceDaysPerYear,
        key: 'Days',
      }]).call(chart);

      window.nv.utils.windowResize(chart.update);

      return chart;
    });
  },

  onGraphLibrariesLoaded() {
    this.set('graph.loaded', true);
    this.drawChart();
  },

  onGraphLibrariesLoadError() {
    this.set('graph.error', true);
    this.set('graph.loaded', false);
  },

  prepareChart() {
    this.get('_prepareChartTask').perform();
  },

  _loadDependencies() {
    return this.get('lazyLoader').loadD3().then(() => {
      return this.get('lazyLoader').loadNv();
    });
  },

  _createSeaserviceStatsForYear(year, seaserviceStats) {
    let seaserviceGivenYear = [];
    this.get('seaservices').map((seaservice) => {
      const signOn = new Date(seaservice.get('signOn'));
      const signOff = new Date(seaservice.get('signOff'));
      const firstDayOfTheYear = new Date(year,0,1);
      const lastDayOfTheYear = new Date(year,11,31);

      if ((signOn.getFullYear() === year) && (signOff.getFullYear() === year)) {
        seaserviceGivenYear.push(
          calculateDaysBetweenDates(signOff, signOn)
        );
      } else if ((signOn.getFullYear() !== year) && (signOff.getFullYear() === year)) {
        seaserviceGivenYear.push(
          calculateDaysBetweenDates(signOff, firstDayOfTheYear)
        );
      } else if ((signOn.getFullYear() === year) && (signOff.getFullYear() !== year)) {
        seaserviceGivenYear.push(
          calculateDaysBetweenDates(lastDayOfTheYear, signOn)
        );
      }
    });
    let result = Math.ceil(seaserviceGivenYear.reduce((a, b) => a + b, 0));
    seaserviceStats.push([year, result]);
  },

  _prepareChartTask: task(function * () {
    try {
      yield this.get('lazyLoader').loadD3();
      yield this.get('lazyLoader').loadNv();
      this.onGraphLibrariesLoaded();
    } catch (e) {
      this.onGraphLibrariesLoadError();
    }
  }),
});
