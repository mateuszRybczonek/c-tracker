import { test, moduleForComponent } from 'ember-qunit';

moduleForComponent('seaservice-table', 'Unit | Component | seaservice-table',
  {
    unit: true,
  }
);

test('sortedSeaservice', function(assert) {
  const component = this.subject();

  const first = _createSeaserviceModelStub(new Date(2016, 3, 5) );
  const second = _createSeaserviceModelStub(new Date(2016, 2, 5));
  const third = _createSeaserviceModelStub(new Date(2015, 3, 5));
  const fourth = _createSeaserviceModelStub(new Date(2015, 3, 4));

  component.set('seaservice', [third, fourth, second, first]);
  assert.deepEqual(component.get('sortedSeaservice'), [first, second, third, fourth],
    'sorts seaservice in descending order based on signOff'
  );
});

function _createSeaserviceModelStub(signOff) {
  return {
    signOff: signOff,
  };
}
