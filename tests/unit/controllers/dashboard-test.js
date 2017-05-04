import Ember from 'ember';
import { test, moduleFor } from 'ember-qunit';
import { createFutureDate } from 'library-app/utils/date-utils';
import { createExpiringCertificatesModelStub, createSeaserviceModelStub } from 'library-app/tests/stubs/test-stubs';

const { run, Service } = Ember;

const statsGenerator = Service.extend({
  seaserviceDaysPerYear() {
    return [ [2013, 0], [2014, 0], [2015, 59], [2016, 29], [2017, 62] ];
  },
});

const seaservice1 = createSeaserviceModelStub(new Date(2017, 0, 1), new Date(2017, 1, 1));
const seaservice2 = createSeaserviceModelStub(new Date(2017, 2, 1), new Date(2017, 3, 1));
const seaservice3 = createSeaserviceModelStub(new Date(2016, 1, 1), new Date(2016, 2, 1));
const seaservice4 = createSeaserviceModelStub(new Date(2015, 0, 1), new Date(2015, 2, 1));


moduleFor('controller:users/dashboard', 'Unit | Controller | users/dashboard', {
  unit: true,

  beforeEach() {
    this.register('service:stats-generator', statsGenerator);
    this.inject.service('stats-generator', { as: 'statsGenerator' });
  },
});

test('expiringCertificates returns correct value', function (assert) {
  const controller = this.subject();

  const certificates = [
    Ember.Object.create({
      id: 1,
      expiryDate: createFutureDate(5),
    }),
    Ember.Object.create({
      id: 2,
      expiryDate: createFutureDate(70),
    }),
    Ember.Object.create({
      id: 3,
      expiryDate: createFutureDate(60),
    }),
  ];

  run(() => {
    controller.set('certificates', certificates );
    assert.equal(controller.get('expiringCertificates').length, 2);
  });
});

test('sortedExpiringCertificates', function(assert) {
  const controller = this.subject();

  const first = createExpiringCertificatesModelStub(new Date(2015, 3, 4));
  const second = createExpiringCertificatesModelStub(new Date(2015, 3, 5));
  const third = createExpiringCertificatesModelStub(new Date(2016, 2, 5));
  const fourth = createExpiringCertificatesModelStub(new Date(2016, 3, 5) );

  run(() => {
    controller.set('expiringCertificates', [third, fourth, second, first]);
    assert.deepEqual(controller.get('sortedExpiringCertificates'), [first, second, third, fourth],
      'sorts expiringCertificates in descending order based on expiryDate'
    );
  });
});

test('firstExpiringCertificate', function(assert) {
  const controller = this.subject();

  const first = createExpiringCertificatesModelStub(new Date(2015, 3, 4));
  const second = createExpiringCertificatesModelStub(new Date(2015, 3, 5));

  run(() => {
    controller.set('expiringCertificates', [second, first]);
    assert.deepEqual(controller.get('firstExpiringCertificate'), first,
      'gets first certificate from expiring certificates'
    );
  });
});

test('certificatesRenewedBasedOnSeaservice', function(assert) {
  const controller = this.subject();

  const certificates = [
    Ember.Object.create({
      id: 1,
      renewedBasedOnSeaservice: true,
    }),
    Ember.Object.create({
      id: 2,
      renewedBasedOnSeaservice: false,
    }),

  ];

  run(() => {
    controller.set('certificates', certificates);
    assert.deepEqual(controller.get('certificatesRenewedBasedOnSeaservice'), [certificates[0]],
      'gets certificates renewed based on seaservice'
    );
  });
});

test('sortedSeaservices', function(assert) {
  const controller = this.subject();

  const first = createSeaserviceModelStub(new Date(2016, 3, 4), new Date(2016, 3, 5));
  const second = createSeaserviceModelStub(new Date(2016, 2, 4), new Date(2016, 2, 5));
  const third = createSeaserviceModelStub(new Date(2015, 3, 4), new Date(2015, 3, 5));
  const fourth = createSeaserviceModelStub(new Date(2015, 3, 3), new Date(2015, 3, 4));

  run(() => {
    controller.set('seaservices', [third, fourth, second, first]);
    assert.deepEqual(controller.get('sortedSeaservices'), [first, second, third, fourth],
      'sorts seaservices in descending order based on signOff date'
    );
  });
});

test('lastSeaservice', function(assert) {
  const controller = this.subject();

  const first = createSeaserviceModelStub(new Date(2015, 3, 3), new Date(2015, 3, 4));
  const second = createSeaserviceModelStub(new Date(2015, 3, 4), new Date(2015, 3, 5));

  run(() => {
    controller.set('seaservices', [second, first]);
    assert.deepEqual(controller.get('lastSeaservice'), second,
      'gets last seaservice from seaservices'
    );
  });
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
