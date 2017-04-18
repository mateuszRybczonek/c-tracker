import Ember from 'ember';
import sinon from 'sinon';
import { test, moduleForComponent } from 'ember-qunit';

moduleForComponent(
  'dashboard/dashboard-toolbar',
  'Unit | Component | dashboard-toolbar',
  {
    unit: true,
  }
);

test('seaserviceLast12Months', function(assert) {
  const component = this.subject();
  component.set('startDate', sinon.stub().returns('Thu Oct 20 2016 00:00:00 GMT+0100 (CET)'));

  const validSeaservice = _createSeaserviceModelStub(new Date(2016, 10, 25), new Date(2016, 11, 25) );
  const invalidSeaservice = _createSeaserviceModelStub(new Date(2015, 2, 5), new Date(2015, 3, 5) );

  const dataProvider = [
    {
      first: validSeaservice,
      second: validSeaservice,
      third: validSeaservice,
      result: 90,
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
      result: 60,
      message: 'returns proper value for multiple valid and invalid seaservices'
    },
  ];

  dataProvider.forEach(dataSet => {
    component.setProperties({
      seaservices: [dataSet.first, dataSet.second, dataSet.third],
    });

    assert.equal(component.get('seaserviceLast12Months'), dataSet.result, dataSet.message);
  });
});

test('workHomeRatio', function(assert) {
  const component = this.subject();

  const dataProvider = [
    {
      seaserviceLast12Months: 0,
      result: '0%',
      message: 'returns proper value for 0 days on board'
    },
    {
      seaserviceLast12Months: 183,
      result: '50%',
      message: 'returns proper value for 183 days on board'
    },
    {
      seaserviceLast12Months: 365,
      result: '100%',
      message: 'returns proper value for 365 days on board'
    },
    {
      seaserviceLast12Months: 10,
      result: '3%',
      message: 'returns properly rounded value'
    },
  ];

  dataProvider.forEach(dataSet => {
    component.set('seaserviceLast12Months', dataSet.seaserviceLast12Months);

    assert.equal(component.get('workHomeRatio'), dataSet.result, dataSet.message);
  });
});

test('totalDPHours', function(assert) {
  const component = this.subject();

  const seaserviceWithDpTime = _createSeaserviceModelStub(new Date(2016, 10, 25), new Date(2016, 11, 25), 30 );
  const seaserviceWithoutDpTime = _createSeaserviceModelStub(new Date(2015, 2, 5), new Date(2015, 3, 5) );

  const dataProvider = [
    {
      first: seaserviceWithDpTime,
      second: seaserviceWithDpTime,
      third: seaserviceWithDpTime,
      result: 90,
      message: 'returns proper value for multiple seaservices with DP time'
    },
    {
      first: seaserviceWithoutDpTime,
      second: seaserviceWithoutDpTime,
      third: seaserviceWithoutDpTime,
      result: 0,
      message: 'returns proper value for multiple seaservices without DP time'
    },
    {
      first: seaserviceWithDpTime,
      second: seaserviceWithoutDpTime,
      third: seaserviceWithDpTime,
      result: 60,
      message: 'returns proper value for multiple seaservices with and without DP time'
    },
  ];

  dataProvider.forEach(dataSet => {
    component.setProperties({
      seaservices: [dataSet.first, dataSet.second, dataSet.third],
    });

    assert.equal(component.get('totalDPHours'), dataSet.result, dataSet.message);
  });
});

test('firstExpiringCert', function(assert) {
  const component = this.subject();

  const dataProvider = [
    {
      fullName: 'License name with more than 10 chars',
      result: '2016-12-31 (License na...)',
      message: 'returns proper value for license name longer than 10 chars'
    },
    {
      fullName: '1234',
      result: '2016-12-31 (1234)',
      message: 'returns proper value for license name shorter than 10 chars'
    },
    {
      fullName: '0123456789',
      result: '2016-12-31 (0123456789)',
      message: 'returns proper value for license name length exactly 10 chars'
    },
  ];

  dataProvider.forEach(dataSet => {
    component.set('firstExpiringCertificate',
      Ember.Object.create({
        name: dataSet.fullName,
        expiryDate: '2016-12-31',
      })
    );

    assert.equal(component.get('firstExpiringCert'), dataSet.result, dataSet.message);
  });
});

function _createSeaserviceModelStub(signOn, signOff, timeOnDP) {
  return Ember.Object.create({
    signOn: signOn,
    signOff: signOff,
    timeOnDP: timeOnDP,
  });
}
