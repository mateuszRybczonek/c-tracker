import Ember from 'ember';
import sinon from 'sinon';
import { calculateDaysBetweenDates } from 'library-app/utils/date-utils';
import colorPalette from 'library-app/consts/color-palette';
import { test, moduleForComponent } from 'ember-qunit';
import { createSeaserviceModelStub } from 'library-app/tests/stubs/test-stubs';

const seaservice1 = createSeaserviceModelStub(new Date(2017, 0, 1), new Date(2017, 1, 1));
const seaservice2 = createSeaserviceModelStub(new Date(2017, 2, 1), new Date(2017, 3, 1));
const seaservice3 = createSeaserviceModelStub(new Date(2016, 1, 1), new Date(2016, 2, 1));
const seaservice4 = createSeaserviceModelStub(new Date(2015, 0, 1), new Date(2015, 2, 1));

moduleForComponent(
  'dashboard/days-on-board-per-year',
  'Unit | Component | dashboard/days-on-board-per-year',
  {
    unit: true,
  }
);

test('seaserviceDaysPerYear returns properly formatted and sorted data', function (assert) {
  const component = this.subject({
    seaservices: [ seaservice1, seaservice2, seaservice3, seaservice4 ]
  });

  sinon.stub(component, 'chartElementPresent', false);

  assert.deepEqual(
    component.get('seaserviceDaysPerYear'),
    [ [2013, 0], [2014, 0], [2015, 59], [2016, 29], [2017, 62] ]
  );
});

test('enoughStats returns false when seaserviceDaysPerYear length = 1', function (assert) {
  const component = this.subject({ seaserviceDaysPerYear: [ [2017, 28] ] });

  sinon.stub(component, 'chartElementPresent', false);
  assert.equal(component.get('enoughStats'), false);
});

test('enoughStats returns false when seaserviceDaysPerYear length = 2', function (assert) {
  const component = this.subject({ seaserviceDaysPerYear: [ [2016, 60], [2017, 28] ] });

  sinon.stub(component, 'chartElementPresent', false);
  assert.equal(component.get('enoughStats'), false);
});

test('enoughStats returns true when seaserviceDaysPerYear length > 2', function (assert) {
  const component = this.subject({
      seaserviceDaysPerYear: [ [2015, 180], [2016, 60], [2017, 28] ]
  });

  sinon.stub(component, 'chartElementPresent', false);
  assert.equal(component.get('enoughStats'), true);
});

test('graphLoading returns', function (assert) {
  const component = this.subject({
    seaservices: [ seaservice1, seaservice2, seaservice3, seaservice4 ]
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

    component.set('seaservices', )
    assert.equal(component.get('graphLoading'), dataSet.expectedValue, dataSet.message);
  });
});

test('showGraph returns', function (assert) {
  const component = this.subject({
    seaservices: [ seaservice1, seaservice2, seaservice3, seaservice4 ]
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
