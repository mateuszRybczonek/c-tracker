import { moduleFor, test } from 'ember-qunit';
import sinon from 'sinon';
import { createSeaserviceModelStub } from 'library-app/tests/stubs/test-stubs';

moduleFor('service:stats-generator', 'Unit | Service | stats-generator', {
  unit: true,
});

test('generateWorkHomeRatioPerYearStats returns', function(assert) {
  const service = this.subject();

  const seaservice1 = createSeaserviceModelStub(new Date(2016, 10, 25), new Date(2016, 11, 25) );
  const seaservice2 = createSeaserviceModelStub(new Date(2015, 2, 5), new Date(2015, 3, 5) );
  const seaservicesStub = [ seaservice1, seaservice2 ];

  const dataProvider = [
    {
      seaservices: seaservicesStub,
      result: [
        [ 2013, 0 ], [ 2014, 0 ], [ 2015, 9 ], [ 2016, 9 ], [ 2017, 0 ]
      ],
      message: 'returns proper value for multiple valid seaservices'
    },
  ];

  dataProvider.forEach(dataSet => {
    service.setProperties({
    thisYear: sinon.stub().returns('2017'),
    seaservices: dataSet.seaservices,
    });

    assert.deepEqual(service.generateWorkHomeRatioPerYearStats(service.seaservices), dataSet.result, dataSet.message);
  });
});

test('seaserviceDaysPerYear returns', function(assert) {
  const service = this.subject();

  const seaservice1 = createSeaserviceModelStub(new Date(2016, 10, 25), new Date(2016, 11, 25) );
  const seaservice2 = createSeaserviceModelStub(new Date(2015, 2, 5), new Date(2015, 3, 5) );
  const seaservicesStub = [ seaservice1, seaservice2 ];

  const dataProvider = [
    {
      seaservices: seaservicesStub,
      result: [
        [ 2013, 0 ], [ 2014, 0 ], [ 2015, 31 ], [ 2016, 30 ], [ 2017, 0 ]
      ],
      message: 'returns proper value for multiple valid seaservices'
    },
  ];

  dataProvider.forEach(dataSet => {
    service.setProperties({
    thisYear: sinon.stub().returns('2017'),
    seaservices: dataSet.seaservices,
    });

    assert.deepEqual(service.seaserviceDaysPerYear(service.seaservices), dataSet.result, dataSet.message);
  });
});

test('generateStayOnBoardStats returns', function(assert) {
  const service = this.subject();

  const seaservice1 = createSeaserviceModelStub(new Date(2016, 10, 25), new Date(2016, 11, 25) );
  const seaservice2 = createSeaserviceModelStub(new Date(2015, 2, 5), new Date(2015, 3, 5) );
  const seaservicesStub = [ seaservice1, seaservice2 ];

  const dataProvider = [
    {
      seaservices: seaservicesStub,
      result: {
        "averageStay": "30",
        "longestStay": "31",
        "shortestStay": "30",
        "totalStay": "61"
      },
      message: 'returns proper value for multiple valid seaservices'
    },
  ];

  dataProvider.forEach(dataSet => {
    service.setProperties({
    seaservices: dataSet.seaservices,
    });

    assert.deepEqual(service.generateStayOnBoardStats(service.seaservices), dataSet.result, dataSet.message);
  });
});
