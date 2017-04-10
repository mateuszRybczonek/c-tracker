import { test, moduleForComponent } from 'ember-qunit';

moduleForComponent(
  'dashboard/expiring-certificates-table/item',
  'Unit | Component | expiring-certificates-table/item',
  {
    unit: true,
  }
);

test('expiryDate', function(assert) {
  const component = this.subject();

  const dataProvider = [
    {
      certificate: {
        expiryDate: '2016-10-27T14:26:11.978Z',
      },
      result: '2016-10-27',
      message: 'when expiry date is given returns properly formatted expiry date',
    },
    {
      certificate: {
        expiryDate: 'n/a',
      },
      result: 'n/a',
      message: 'when expiry date is n/a returns n/a',
    },
  ];

  dataProvider.forEach(dataSet => {
    component.setProperties({
      certificate: dataSet.certificate,
    });

    assert.equal(component.get('expiryDate'), dataSet.result, dataSet.message);
  });
});

test('daysLeft', function(assert) {
  const component = this.subject();

  const dataProvider = [
    {
      date: '2016-10-17T14:26:11.978Z',
      result: 'Expired',
      message: 'returns "Expired" for certificate with expiry date in the past',
    },
    {
      date: new Date(new Date().setDate(new Date().getDate() + 10)),
      result: '10',
      message: 'returns proper number of days left for certificate with expiry date in the future',
    },
    {
      date: new Date(),
      result: 'Expired',
      message: 'returns "Expired" for certificate with expiry date today',
    },
  ];

  dataProvider.forEach(dataSet => {
    component.setProperties({
      certificate: {
        expiryDate: dataSet.date,
      },
    });
    assert.equal(component.get('daysLeft'), dataSet.result, dataSet.message);
  });
});
