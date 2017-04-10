import { test, moduleForComponent } from 'ember-qunit';
import { createExpiringCertificatesModelStub } from 'library-app/tests/stubs/test-stubs';


moduleForComponent('dashboard/expiring-certificates-table',
  'Unit | Component | expiring-certificates-table',
  {
    unit: true,
  }
);

test('sortedCertificates', function(assert) {
  const component = this.subject();

  const first = createExpiringCertificatesModelStub(new Date(2015, 3, 4));
  const second = createExpiringCertificatesModelStub(new Date(2015, 3, 5));
  const third = createExpiringCertificatesModelStub(new Date(2016, 2, 5));
  const fourth = createExpiringCertificatesModelStub(new Date(2016, 3, 5) );

  component.set('certificates', [third, fourth, second, first]);
  assert.deepEqual(component.get('sortedCertificates'), [first, second, third, fourth],
    'sorts certificates in ascending order based on expiryDate'
  );
});
