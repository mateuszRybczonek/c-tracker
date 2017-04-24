import Ember from 'ember';
import sinon from 'sinon';
import { test, moduleForComponent } from 'ember-qunit';

moduleForComponent(
  'dashboard/work-home-ratio-chart',
  'Unit | Component | dashboard/work-home-ratio-chart',
  {
    unit: true,
  }
);

test('chartId returns properly formatted id', function (assert) {
  const component = this.subject({
    idIndex: 1,
  });

  sinon.stub(component, 'chartElementPresent', false);

  assert.equal(component.get('chartId'), 'work-home-ratio-chart-1');
});

test('year returns proper year', function (assert) {
  const component = this.subject({
    ratioPerYear: [2016, 30],
  });

  sinon.stub(component, 'chartElementPresent', false);

  assert.equal(component.get('year'), 2016);
});

test('graphLoading returns', function (assert) {
  const component = this.subject({
    ratioPerYear: [2016, 30],
  });

  const dataProvider = [
    {
      loaded: false,
      error: false,
      expectedValue: true,
      message: 'true for "graph.loaded = false" and "graph.error = false"',
    }, {
      loaded: true,
      error: false,
      expectedValue: false,
      message: 'false for "graph.loaded = true" and "graph.error = false"',
    }, {
      loaded: false,
      error: true,
      expectedValue: false,
      message: 'false for "graph.loaded = false" and "graph.error = true"',
    }, {
      loaded: true,
      error: true,
      expectedValue: false,
      message: 'false for "graph.loaded = true" and "graph.error = true"',
    },
  ];

  dataProvider.forEach(dataSet => {
    component.set('graph', Ember.Object.create({
      loaded: dataSet.loaded,
      error: dataSet.error,
    }));

    assert.equal(component.get('graphLoading'), dataSet.expectedValue, dataSet.message);
  });
});

test('showGraph returns', function (assert) {
  const component = this.subject({
    ratioPerYear: [2016, 30],
  });
  const dataProvider = [
    {
      graphLoading: false,
      error: false,
      expectedValue: true,
      message: 'true for "graphLoading = false" and "graph.error = false"',
    }, {
      graphLoading: true,
      error: false,
      expectedValue: false,
      message: 'false for "graphLoading = true" and "graph.error = false"',
    }, {
      graphLoading: false,
      error: true,
      expectedValue: false,
      message: 'false for "graphLoading = false" and "graph.error = true"',
    }, {
      graphLoading: true,
      error: true,
      expectedValue: false,
      message: 'false for "graphLoading = true" and "graph.error = true"',
    },
  ];

  dataProvider.forEach(dataSet => {
    component.set('graph', Ember.Object.create({
      error: dataSet.error,
    }));

    component.set('graphLoading', dataSet.graphLoading);

    assert.equal(component.get('showGraph'), dataSet.expectedValue, dataSet.message);
  });
});
