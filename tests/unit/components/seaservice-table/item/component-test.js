import Ember from 'ember';
import sinon from 'sinon';
import { test, moduleForComponent } from 'ember-qunit';

moduleForComponent('seaservice-table/item', 'Unit | Component | seaservice-table/item',
  {
    unit: true,
  }
);

test('daysOfService', function(assert) {
  const component = this.subject();
  component.set('startDate', sinon.stub().returns('Thu Oct 20 2016 00:00:00 GMT+0100 (CET)'));

  const positiveSeaserviceStub = _createSeaserviceModelStub(new Date(2016, 10, 25), new Date(2016, 11, 25) );
  const neutralSeaserviceStub = _createSeaserviceModelStub(new Date(2016, 11, 25), new Date(2016, 11, 25) );
  const negativeSeaserviceStub = _createSeaserviceModelStub(new Date(2016, 11, 25), new Date(2016, 10, 25) );

  const dataProvider = [
    {
      seaserviceStub: positiveSeaserviceStub,
      result: 30,
      message: 'returns proper positive value'
    },
    {
      seaserviceStub: negativeSeaserviceStub,
      result: 'Invalid dates',
      message: 'returns proper negative value'
    },
    {
      seaserviceStub: neutralSeaserviceStub,
      result: 'Invalid dates',
      message: 'returns proper neutral (0) value'
    },
  ];

  dataProvider.forEach(dataSet => {
    component.setProperties({
      seaservice: dataSet.seaserviceStub,
    });

    assert.equal(component.get('daysOfService'), dataSet.result, dataSet.message);
  });
});

test('validDates', function(assert) {
  const component = this.subject();
  component.set('startDate', sinon.stub().returns('Thu Oct 20 2016 00:00:00 GMT+0100 (CET)'));

  const positiveSeaserviceStub = _createSeaserviceModelStub(new Date(2016, 10, 25), new Date(2016, 11, 25) );
  const neutralSeaserviceStub = _createSeaserviceModelStub(new Date(2016, 11, 25), new Date(2016, 11, 25) );
  const negativeSeaserviceStub = _createSeaserviceModelStub(new Date(2016, 11, 25), new Date(2016, 10, 25) );

  const dataProvider = [
    {
      seaserviceStub: positiveSeaserviceStub,
      result: true,
      message: 'returns proper positive value'
    },
    {
      seaserviceStub: negativeSeaserviceStub,
      result: false,
      message: 'returns proper negative value'
    },
    {
      seaserviceStub: neutralSeaserviceStub,
      result: false,
      message: 'returns proper neutral (0) value'
    },
  ];

  dataProvider.forEach(dataSet => {
    component.setProperties({
      seaservice: dataSet.seaserviceStub,
    });

    assert.equal(component.get('validDates'), dataSet.result, dataSet.message);
  });
});

function _createSeaserviceModelStub(signOn, signOff, timeOnDP) {
  return Ember.Object.create({
    signOn: signOn,
    signOff: signOff,
    timeOnDP: timeOnDP,
  });
}
