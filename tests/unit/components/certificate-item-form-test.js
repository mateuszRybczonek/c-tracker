import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('certificate-item-form', 'Unit | Component | certificate-item-form', {
  unit: true
});

test('formattedProgressValue', function(assert) {
  const component = this.subject();

  const dataProvider = [
    {
      progressValue: 0,
      result: '0%',
      message: 'returns proper value for 0',
    }, {
      progressValue: 0.146,
      result: '15%',
      message: 'returns proper value for 0.146',
    }, {
      progressValue: 1,
      result: '100%',
      message: 'returns proper value for 1',
    },
  ];

  dataProvider.forEach(dataSet => {
    component.setProperties({
      progressValue: dataSet.progressValue,
    });

    assert.equal(component.get('formattedProgressValue'), dataSet.result, dataSet.message);
  });
});

test('expiryDateAfterIssueDate', function(assert) {
  const component = this.subject();

  const dataProvider = [
    {
      issueDate: '2015-01-30',
      expiryDate: '2015-01-15',
      result: false,
      message: 'returns false if expiryDate before issueDate',
    }, {
      issueDate: '2015-01-15',
      expiryDate: '2015-01-30',
      result: true,
      message: 'returns true if expiryDate after issueDate',
    }, {
      issueDate: '2015-01-15',
      expiryDate: '2015-01-15',
      result: false,
      message: 'returns false if expiryDate equals issueDate',
    }, {
      issueDate: '2015-01-15',
      expiryDate: 'n/a',
      result: true,
      message: 'returns true if expiryDate "n/a"',
    }, {
      issueDate: '2015-01-15',
      expiryDate: '',
      result: true,
      message: 'returns true if expiryDate ""',
    },
  ];

  dataProvider.forEach(dataSet => {
    component.setProperties({
      certificate: {
        issueDate: dataSet.issueDate,
        expiryDate: dataSet.expiryDate,
      },
    });

    assert.equal(component.get('expiryDateAfterIssueDate'), dataSet.result, dataSet.message);
  });
});

test('correctDates', function(assert) {
  const component = this.subject();

  const dataProvider = [
    {
      issueDate: '2015-01-30',
      expiryDate: '2015-01-15',
      result: true,
      message: 'returns true if expiryDate and issueDate are in range',
    }, {
      issueDate: '1899-01-15',
      expiryDate: '2015-01-30',
      result: false,
      message: 'returns false if issueDate year <1900',
    }, {
      issueDate: '2101-01-15',
      expiryDate: '2015-01-15',
      result: false,
      message: 'returns false if issueDate year >2100',
    },  {
      issueDate: '2015-01-15',
      expiryDate: '1899-01-30',
      result: false,
      message: 'returns false if expiryDate year <1900',
    }, {
      issueDate: '2015-01-15',
      expiryDate: '2101-01-15',
      result: false,
      message: 'returns false if expiryDate year >2100',
    }, {
      issueDate: '2015-01-15',
      expiryDate: 'n/a',
      result: true,
      message: 'returns true if expiryDate "n/a" and issueDate within range',
    }, {
      issueDate: '2015-01-15',
      expiryDate: 'n/a',
      result: true,
      message: 'returns true if expiryDate "n/a" and issueDate within range',
    },  {
      issueDate: '1899-01-15',
      expiryDate: 'n/a',
      result: false,
      message: 'returns true if expiryDate "n/a" and issueDate year <1900',
    }, {
      issueDate: '1899-01-15',
      expiryDate: 'n/a',
      result: false,
      message: 'returns true if expiryDate "n/a" and issueDate year <1900',
    },   {
      issueDate: '2101-01-15',
      expiryDate: 'n/a',
      result: false,
      message: 'returns true if expiryDate "n/a" and issueDate year >2100',
    }, {
      issueDate: '2101-01-15',
      expiryDate: 'n/a',
      result: false,
      message: 'returns true if expiryDate "n/a" and issueDate year >2100',
    }, {
      issueDate: '2015-01-15',
      expiryDate: '',
      result: true,
      message: 'returns true if expiryDate "" and issueDate within range',
    }, {
      issueDate: '2015-01-15',
      expiryDate: '',
      result: true,
      message: 'returns true if expiryDate "" and issueDate within range',
    },
  ];

  dataProvider.forEach(dataSet => {
    component.setProperties({
      certificate: {
        issueDate: dataSet.issueDate,
        expiryDate: dataSet.expiryDate,
      },
    });

    assert.equal(component.get('correctDates'), dataSet.result, dataSet.message);
  });
});
