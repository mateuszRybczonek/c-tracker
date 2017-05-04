import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';
import RSVP from 'rsvp';
import { createSeaserviceModelStub } from 'library-app/tests/stubs/test-stubs';

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

const seaservice1 = createSeaserviceModelStub(new Date(2017, 0, 1), new Date(2017, 1, 1));
const seaservice2 = createSeaserviceModelStub(new Date(2017, 2, 1), new Date(2017, 3, 1));
const seaservice3 = createSeaserviceModelStub(new Date(2016, 1, 1), new Date(2016, 2, 1));
const seaservice4 = createSeaserviceModelStub(new Date(2015, 0, 1), new Date(2015, 2, 1));

moduleForComponent(
  'statistics/days-on-board-per-year',
  'Integration | Component | statistics/days-on-board-per-year',
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
        seaservices: [],
        graphError: 'graph error',
        graph: {
          loaded: false,
          error: false,
        },
      });
    },
  });

test('it renders', function(assert) {
  this.stubNvGlobal(false);

  this.render(hbs `{{statistics/days-on-board-per-year seaservices=seaservices}}`);

  assert.equal(
    this.$('#yearly-days-chart').length,
    1,
    'yearly-days-chart div should not be rendered with default values'
  );
});

test('it renders correctly when graph.error is set to true', function(assert) {
  const graph = {
    loaded: false,
    error: true,
  };

  this.set('seaservices', [ seaservice1, seaservice2, seaservice3, seaservice4 ]);

  this.stubNvGlobal(graph.loaded);
  this.set('graph', graph);
  this.render(hbs `
    {{statistics/days-on-board-per-year
      seaservices=seaservices
      graph=graph
    }}
  `);

  assert.ok(
    !this.$('.graph_error').hasClass('hidden'),
    'error element should not have hidden class'
  );
  assert.ok(this.$('.loading').hasClass('hidden'), 'loading element should have hidden class');
  assert.ok(this.$('.graph').hasClass('hidden'), 'graph element should have hidden class');
});

test('it renders correctly when graph.loaded is set to true', function(assert) {
  const graph = {
    loaded: true,
    error: false,
  };
  this.stubNvGlobal(graph.loaded);
  this.set('graph', graph);
  this.render(hbs `
    {{statistics/days-on-board-per-year
      seaservices=seaservices
      graph=graph
      enoughStats=true
    }}
  `);
  assert.ok(this.$('.graph_error').hasClass('hidden'), 'error element should have hidden class');
  assert.ok(this.$('.loading').hasClass('hidden'), 'loading element should have hidden class');
  assert.ok(!this.$('.graph').hasClass('hidden'), 'graph element should not have hidden class');
});

test('it renders correctly when all values are set to false', function(assert) {
  const graph = {
    loaded: false,
    error: false,
  };
  this.stubNvGlobal(graph.loaded);
  this.setProperties({
    graph,
    showGraph: false,
  });

  this.render(
    hbs `
      {{statistics/days-on-board-per-year
        seaservices=seaservices
        graph=graph
        enoughStats=true
      }}
    `
  );

  assert.ok(this.$('.graph_error').hasClass('hidden'), 'error element should have hidden class');
  assert.ok(!this.$('.loading').hasClass('hidden'), 'loading element should not have hidden class');
  assert.ok(this.$('.graph').hasClass('hidden'), 'graph element should have hidden class');
});
