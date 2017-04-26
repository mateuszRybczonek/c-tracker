import Ember from 'ember';
import colorPalette from 'library-app/consts/color-palette';
import { task } from 'ember-concurrency';

const { DARK_GREY } = colorPalette;
const { Component, computed, observer, inject: { service } } = Ember;

export default Component.extend({
  lazyLoader: service(),
  statsGenerator: service(),

  seaserviceDaysPerYear: computed('statsGenerator', function() {
    return this.get('statsGenerator')
      .seaserviceDaysPerYear(this.get('seaservices'));
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
