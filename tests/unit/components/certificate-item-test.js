import { test, moduleForComponent } from 'ember-qunit';
import sinon from 'sinon';

moduleForComponent(
  'certificate-item',
  'Unit | Component | certificate-item',
  {
    unit: true,
  }
);

test('closeToExpiry', function(assert) {
  const component = this.subject();

  const dataProvider = [
    {
      daysToExpiry: 'Expired',
      result: false,
      message: 'returns false when expired',
    },
    {
      daysToExpiry: '59',
      result: true,
      message: 'returns true when under 60 days',
    },
    {
      daysToExpiry: '60',
      result: false,
      message: 'returns true when 60 days',
    },
    {
      daysToExpiry: '61',
      result: false,
      message: 'returns true when more than 60 days',
    },
  ];

  dataProvider.forEach(dataSet => {
    component.setProperties({
      daysToExpiry: dataSet.daysToExpiry,
    });

    assert.equal(component.get('closeToExpiry'), dataSet.result, dataSet.message);
  });
});

test('expired', function(assert) {
  const component = this.subject();

  const dataProvider = [
    {
      daysToExpiry: 'Expired',
      result: true,
      message: 'returns false when expired',
    },
    {
      daysToExpiry: 1,
      result: false,
      message: 'returns true when not expired',
    },
  ];

  dataProvider.forEach(dataSet => {
    component.setProperties({
      daysToExpiry: dataSet.daysToExpiry,
    });

    assert.equal(component.get('expired'), dataSet.result, dataSet.message);
  });
});

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

test('imagePath', function(assert) {
  const component = this.subject();

  const dataProvider = [
    {
      session: {
        currentUser: {
          uid: 'userId',
        },
      },
      certificate: {
        id: 'certificateId',
      },
      result: 'userId/certificates/certificateId.jpg',
      message: 'returns proper path for image',
    },
  ];

  dataProvider.forEach(dataSet => {
    component.setProperties({
      session: dataSet.session,
      certificate: dataSet.certificate,
    });

    assert.equal(component.get('imagePath'), dataSet.result, dataSet.message);
  });
});
