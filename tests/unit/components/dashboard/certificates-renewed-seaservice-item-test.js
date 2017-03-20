import Ember from 'ember';
import { test, moduleForComponent } from 'ember-qunit';

moduleForComponent('dashboard/certificates-renewed-seaservice-item',
  'Unit | Component | certificates-renewed-seaservice-item',
  {
    unit: true,
  }
);

test('seaserviceSinceIssue', function(assert) {
  const component = this.subject();

  const certificate = Ember.Object.create({
    issueDate: new Date(2016, 3, 5),
  });

  const validSeaservice = _createSeaserviceModelStub(new Date(2016, 3, 5), new Date(2016, 3, 15) );
  const invalidSeaservice = _createSeaserviceModelStub(new Date(2015, 2, 5), new Date(2015, 3, 5) );
  const seaserviceDuringIssuance = _createSeaserviceModelStub(new Date(2016, 2, 5), new Date(2016, 3, 10) );
  
  const dataProvider = [
    {
      first: validSeaservice,
      second: validSeaservice,
      third: validSeaservice,
      result: 30,
      message: 'returns proper value for multiple valid seaservices'
    },
    {
      first: invalidSeaservice,
      second: invalidSeaservice,
      third: invalidSeaservice,
      result: 0,
      message: 'returns proper value for multiple invalid seaservices'
    },
    {
      first: validSeaservice,
      second: invalidSeaservice,
      third: validSeaservice,
      result: 20,
      message: 'returns proper value for multiple valid and invalid seaservices'
    },
    {
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

  const validSeaservice = _createSeaserviceModelStub(new Date(2016, 3, 5), new Date(2016, 3, 15) );
  const invalidSeaservice = _createSeaserviceModelStub(new Date(2015, 2, 5), new Date(2015, 3, 5) );
  
  const dataProvider = [
    {
      seaservice: validSeaservice,
      result: 355,
      message: 'returns proper value for valid seaservice'
    },
    {
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

function _createSeaserviceModelStub(signOn, signOff) {
  return Ember.Object.create({
    signOn: signOn,
    signOff: signOff,
  });
}
