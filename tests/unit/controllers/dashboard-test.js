import Ember from 'ember';
import { test, moduleFor } from 'ember-qunit';
import { createFutureDate } from 'library-app/utils/date-utils';

const { run } = Ember;

moduleFor('controller:users/dashboard', 'Unit | Controller | users/dashboard', {
  unit: true,
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

  const first = _createExpiringCertificatesModelStub(new Date(2015, 3, 4));
  const second = _createExpiringCertificatesModelStub(new Date(2015, 3, 5));
  const third = _createExpiringCertificatesModelStub(new Date(2016, 2, 5));
  const fourth = _createExpiringCertificatesModelStub(new Date(2016, 3, 5) );

  run(() => {
    controller.set('expiringCertificates', [third, fourth, second, first]);
    assert.deepEqual(controller.get('sortedExpiringCertificates'), [first, second, third, fourth],
      'sorts expiringCertificates in descending order based on expiryDate'
    );
  });
});

test('firstExpiringCertificate', function(assert) {
  const controller = this.subject();

  const first = _createExpiringCertificatesModelStub(new Date(2015, 3, 4));
  const second = _createExpiringCertificatesModelStub(new Date(2015, 3, 5));

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

  const first = _createSeaservicesModelStub(new Date(2016, 3, 5) );
  const second = _createSeaservicesModelStub(new Date(2016, 2, 5));
  const third = _createSeaservicesModelStub(new Date(2015, 3, 5));
  const fourth = _createSeaservicesModelStub(new Date(2015, 3, 4));

  run(() => {
    controller.set('seaservices', [third, fourth, second, first]);
    assert.deepEqual(controller.get('sortedSeaservices'), [first, second, third, fourth],
      'sorts seaservices in descending order based on signOff date'
    );
  });
});

test('lastSeaservice', function(assert) {
  const controller = this.subject();

  const first = _createSeaservicesModelStub(new Date(2015, 3, 4));
  const second = _createSeaservicesModelStub(new Date(2015, 3, 5));

  run(() => {
    controller.set('seaservices', [second, first]);
    assert.deepEqual(controller.get('lastSeaservice'), first,
      'gets last seaservice from seaservices'
    );
  });
});

function _createExpiringCertificatesModelStub({ expiryDate }) {
  return {
    expiryDate: expiryDate,
  };
}

function _createSeaservicesModelStub({ signOffDate }) {
  return {
    signOff: signOffDate,
  };
}
