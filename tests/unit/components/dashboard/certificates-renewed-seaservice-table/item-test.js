import Ember from 'ember';
import { test, moduleForComponent } from 'ember-qunit';
import { createSeaserviceModelStub } from 'library-app/tests/stubs/test-stubs';

moduleForComponent('dashboard/certificates-renewed-seaservice-table/item',
  'Unit | Component | certificates-renewed-seaservice-table/item',
  {
    unit: true,
  }
);

test('seaserviceSinceIssue', function(assert) {
  const component = this.subject();

  const certificate = Ember.Object.create({
    issueDate: new Date(2016, 3, 5),
  });

  const validSeaservice = createSeaserviceModelStub(new Date(2016, 3, 5), new Date(2016, 3, 15) );
  const invalidSeaservice = createSeaserviceModelStub(new Date(2015, 2, 5), new Date(2015, 3, 5) );
  const seaserviceDuringIssuance = createSeaserviceModelStub(new Date(2016, 2, 5), new Date(2016, 3, 10) );

  const dataProvider = [
    {
      first: validSeaservice,
      second: validSeaservice,
      third: validSeaservice,
      result: 30,
      message: 'returns proper value for multiple valid seaservices'
    }, {
      first: invalidSeaservice,
      second: invalidSeaservice,
      third: invalidSeaservice,
      result: 0,
      message: 'returns proper value for multiple invalid seaservices'
    }, {
      first: validSeaservice,
      second: invalidSeaservice,
      third: validSeaservice,
      result: 20,
      message: 'returns proper value for multiple valid and invalid seaservices'
    }, {
      first: validSeaservice,
      second: invalidSeaservice,
      third: seaserviceDuringIssuance,
      result: 10,
      message: 'returns proper value for valid, invalid and seaservice during issuance'
    },
  ];

  dataProvider.forEach(dataSet => {
    component.setProperties({
      certificate: certificate,
      seaservices: [dataSet.first, dataSet.second, dataSet.third],
    });

    assert.equal(component.get('seaserviceSinceIssue'), dataSet.result, dataSet.message);
  });
});

test('missingSeaservice', function(assert) {
  const component = this.subject();

  const certificate = Ember.Object.create({
    issueDate: new Date(2016, 3, 5),
    daysOfServiceToRenew: 365,
  });

  const validSeaservice = createSeaserviceModelStub(new Date(2016, 3, 5), new Date(2016, 3, 15) );
  const invalidSeaservice = createSeaserviceModelStub(new Date(2015, 2, 5), new Date(2015, 3, 5) );

  const dataProvider = [
    {
      seaservice: validSeaservice,
      result: 355,
      message: 'returns proper value for valid seaservice'
    }, {
      seaservice: invalidSeaservice,
      result: 365,
      message: 'returns proper value for invalid seaservices'
    },
  ];

  dataProvider.forEach(dataSet => {
    component.setProperties({
      certificate: certificate,
      seaservices: [dataSet.seaservice],
    });

    assert.equal(component.get('missingSeaservice'), dataSet.result, dataSet.message);
  });
});

test('progressRatio', function(assert) {
  const component = this.subject();

  const certificate = Ember.Object.create({
    issueDate: new Date(2016, 3, 5),
    daysOfServiceToRenew: 365,
  });

  const dataProvider = [
    {
      seaserviceSinceIssue: 365,
      result: 100,
      message: 'returns proper value when seaservice condition is met (100%)'
    }, {
      seaserviceSinceIssue: 182,
      result: 50,
      message: 'returns proper value when below 100%'
    }, {
      seaserviceSinceIssue: 0,
      result: 0,
      message: 'returns proper value when below 100%'
    },
  ];

  dataProvider.forEach(dataSet => {
    component.setProperties({
      certificate: certificate,
      seaserviceSinceIssue: [dataSet.seaserviceSinceIssue],
    });

    assert.equal(component.get('progressRatio'), dataSet.result, dataSet.message);
  });
});
