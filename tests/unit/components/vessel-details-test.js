import { test, moduleForComponent } from 'ember-qunit';

moduleForComponent(
  'vessel-details',
  'Unit | Component | vessel-details',
  {
    unit: true,
  }
);

test('sanitizedVesselDetails', function(assert) {
  const component = this.subject();

  const dataProvider = [
    {
      seaservice: {
        vesselDetails: 'One line',
      },
      result: 'One line',
      message: 'returns one liner for one liner vesselDetails',
    },
    {
      seaservice: {
        vesselDetails: 'First line\nSecond line',
      },
      result: 'First line<br>Second line',
      message: 'returns <br> instead of /n',
    },
    {
      seaservice: {
        vesselDetails: undefined,
      },
      result: null,
      message: 'returns null when the property is undefined',
    },
  ];

  dataProvider.forEach(dataSet => {
    component.setProperties({
      seaservice: dataSet.seaservice,
    });

    assert.equal(component.get('sanitizedVesselDetails'), dataSet.result, dataSet.message);
  });
});

test('sanitizedVesselActivities', function(assert) {
  const component = this.subject();

  const dataProvider = [
    {
      seaservice: {
        vesselActivities: 'One line',
      },
      result: 'One line',
      message: 'returns one liner for one liner vesselDetails',
    },
    {
      seaservice: {
        vesselActivities: 'First line\nSecond line',
      },
      result: 'First line<br>Second line',
      message: 'returns <br> instead of /n',
    },
    {
      seaservice: {
        vesselActivities: undefined,
      },
      result: null,
      message: 'returns null when the property is undefined',
    },
  ];

  dataProvider.forEach(dataSet => {
    component.setProperties({
      seaservice: dataSet.seaservice,
    });

    assert.equal(component.get('sanitizedVesselActivities'), dataSet.result, dataSet.message);
  });
});
