import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';
import RSVP from 'rsvp';

const { Service } = Ember;
const { Promise } = RSVP;

const lazyLoaderStub = Service.extend({
  loadD3() {
    return Promise.resolve(true);
  },

  loadNv() {
    return Promise.resolve(true);
  },
});

moduleForComponent(
  'statistics/work-home-ratio-chart',
  'Integration | Component | statistics/work home ratio chart',
  {
    integration: true,

    stubNvGlobal(graphLoaded) {
      const that = this;
      window.nv = {
        addGraph() {
          that.set('graph.loaded', graphLoaded);
        },
      };
    },

    beforeEach() {
      this.register('service:lazy-loader', lazyLoaderStub);
      this.inject.service('lazy-loader', { as: 'lazyLoader' });
      this.setProperties({
        ratioPerYear: [2014, 30],
        graphError: 'graph error',
        graph: {
          loaded: false,
          error: false,
        },
      });
    },
  });

test('it renders', function(assert) {
  this.set('ratioPerYear', [2014, 30]);
  this.stubNvGlobal(false);

  this.render(hbs `{{statistics/work-home-ratio-chart ratioPerYear=ratioPerYear}}`);

  assert.equal(
    this.$('.year-title').text().trim(),
    2014,
    'graph for proper year'
  );
});
