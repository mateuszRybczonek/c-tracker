import Ember from 'ember';
import colorPalette from 'library-app/consts/color-palette';
import { calculateDaysBetweenDates } from 'library-app/utils/date-utils';
import { task } from 'ember-concurrency';

const { GREY, LIGHT_GREY } = colorPalette;
const { Component, computed, observer, inject: { service } } = Ember;

export default Component.extend({
  lazyLoader: service(),
  classNames: ['work-home-ratio-chart'],

  chartId: computed('idIndex', function () {
    return `work-home-ratio-chart-${this.get('idIndex')}`;
  }),

  year: computed('ratioPerYear', function() {
    return this.get('ratioPerYear')[0];
  }),

  graphLoading: computed('graph.{loaded,error}', function() {
    return !(this.get('graph.loaded') || this.get('graph.error'));
  }),

  showGraph: computed('graph.error', 'graphLoading', function() {
    return !(this.get('graph.error') || this.get('graphLoading'));
  }),

  drawGraph: observer('ratioPerYear', function() {
    this.drawChart();
  }),

  init() {
    this._super(...arguments);
    this.setProperties({
      ratioPerYear: this.get('ratioPerYear') || [],
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
    return this.$(`#${this.get('chartId')}`).length > 0;
  },

  drawChart() {
    const ratioPerYear = this.get('ratioPerYear');
    const chartId = this.get('chartId');
    const data = [
      {
        label: 'Work',
        value: ratioPerYear[1],
      }, {
        label: 'Home',
        value: 100 - ratioPerYear[1],
      }
    ]

    if (!this.chartElementPresent()) {
      return;
    }

    window.nv.addGraph(function() {
      const chart = window.nv.models.pieChart()
        .x((d) => d.label)
        .y((d) => d.value)
        .showLabels(true)
        .labelType('percent')
        .showLegend(false)
        .color([GREY, LIGHT_GREY])
        .growOnHover(true)

      window.d3.select(`#${chartId} svg`)
        .datum(data)
        .transition().duration(1200)
        .call(chart);

      window.d3.selectAll(".nv-label text")
        .attr("transform", function(d){
          d.innerRadius = -450;
          d.outerRadius = 520;
          return "translate(" + d3.svg.arc().outerRadius(520).centroid(d) + ")";}
        )
        .attr("text-anchor", "middle")
        .style({"font-size": "12px"})
      ;

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
