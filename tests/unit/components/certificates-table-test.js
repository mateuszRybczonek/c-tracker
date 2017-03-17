import Ember from 'ember';
import { test, moduleForComponent } from 'ember-qunit';
import { createFutureDate } from 'library-app/utils/date-utils';

moduleForComponent('certificates-table', 'Unit | Component | certificates-table',
  {
    unit: true,
  }
);

test('sortedCertificates', function(assert) {
  const component = this.subject();

  const first = _createExpiringCertificatesModelStub(new Date(2015, 3, 4));
  const second = _createExpiringCertificatesModelStub(new Date(2015, 3, 5));
  const third = _createExpiringCertificatesModelStub(new Date(2016, 2, 5));
  const fourth = _createExpiringCertificatesModelStub(new Date(2016, 3, 5) );

  component.set('certificates', [third, fourth, second, first]);
  assert.deepEqual(component.get('sortedCertificates'), [first, second, third, fourth],
    'sorts certificates in descending order based on expiryDate'
  );
});

function _createExpiringCertificatesModelStub({ expiryDate }) {
  return {
    expiryDate: expiryDate,
  };
}
