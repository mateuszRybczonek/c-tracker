import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';
import { createSeaserviceModelStub } from 'library-app/tests/stubs/test-stubs';

const { Service } = Ember;

const statsGenerator = Service.extend({
  seaserviceDaysPerYear() {
    return [ [2013, 0], [2014, 0], [2015, 59], [2016, 29], [2017, 62] ];
  },
});

const seaservice1 = createSeaserviceModelStub(new Date(2017, 0, 1), new Date(2017, 1, 1));
const seaservice2 = createSeaserviceModelStub(new Date(2017, 2, 1), new Date(2017, 3, 1));
const seaservice3 = createSeaserviceModelStub(new Date(2016, 1, 1), new Date(2016, 2, 1));
const seaservice4 = createSeaserviceModelStub(new Date(2015, 0, 1), new Date(2015, 2, 1));

moduleFor('controller:users/statistics', 'Unit | Controller | users/statistics', {
  unit: true,

  beforeEach() {
    this.register('service:stats-generator', statsGenerator);
    this.inject.service('stats-generator', { as: 'statsGenerator' });
  },
});

test('seaserviceDaysPerYear returns properly formatted and sorted data', function (assert) {
  const component = this.subject({
    seaservices: [ seaservice1, seaservice2, seaservice3, seaservice4 ]
  });

  assert.deepEqual(
    component.get('seaserviceDaysPerYear'),
    [ [2013, 0], [2014, 0], [2015, 59], [2016, 29], [2017, 62] ]
  );
});
