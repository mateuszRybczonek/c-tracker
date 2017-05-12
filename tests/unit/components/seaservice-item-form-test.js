import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('seaservice-item-form', 'Unit | Component | seaservice-item-form', {
  unit: true
});

test('signOffDateAfterSignOnDate', function(assert) {
  const component = this.subject();

  const dataProvider = [
    {
      signOn: '2015-01-30',
      signOff: '2015-01-15',
      result: false,
      message: 'returns false if signOff before signOn',
    }, {
      signOn: '2015-01-15',
      signOff: '2015-01-30',
      result: true,
      message: 'returns true if signOff after signOn',
    }, {
      signOn: '2015-01-15',
      signOff: '2015-01-15',
      result: false,
      message: 'returns false if signOff equals signOn',
    },
  ];

  dataProvider.forEach(dataSet => {
    component.setProperties({
      seaservice: {
        signOn: dataSet.signOn,
        signOff: dataSet.signOff,
      },
    });

    assert.equal(component.get('signOffDateAfterSignOnDate'), dataSet.result, dataSet.message);
  });
});

test('correctDates', function(assert) {
  const component = this.subject();

  const dataProvider = [
    {
      signOn: '2015-01-30',
      signOff: '2015-01-15',
      result: true,
      message: 'returns true if expiryDate and issueDate are in range',
    }, {
      signOn: '1949-01-15',
      signOff: '2015-01-30',
      result: false,
      message: 'returns false if issueDate year <1950',
    }, {
      signOn: '2101-01-15',
      signOff: '2015-01-15',
      result: false,
      message: 'returns false if issueDate year >2100',
    },  {
      signOn: '2015-01-15',
      signOff: '1949-01-30',
      result: false,
      message: 'returns false if expiryDate year <1950',
    }, {
      signOn: '2015-01-15',
      signOff: '2101-01-15',
      result: false,
      message: 'returns false if expiryDate year >2100',
    },
  ];

  dataProvider.forEach(dataSet => {
    component.setProperties({
      seaservice: {
        signOn: dataSet.signOn,
        signOff: dataSet.signOff,
      },
    });

    assert.equal(component.get('correctDates'), dataSet.result, dataSet.message);
  });
});
