import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { certificateStub, sessionStub } from 'library-app/tests/stubs/test-stubs';

moduleForComponent(
  'certificates-table/item/details',
  'Integration | Component | certificates-table/item/details', {
    integration: true,
    beforeEach() {
      this.setProperties({
        certificate: certificateStub(new Date(2027, 1, 17)),
        session: sessionStub(),
      });
    }
  }
);

test('it renders details properly', function(assert) {
  this.render(hbs`{{certificates-table/item/details certificate=certificate session=session}}`);

  assert.ok(
    $(this.$('.certificate-details:contains("Fri Feb 17 2017 00:00:00 GMT+0100 (CET)")')),
    'issue date');
  assert.ok($(this.$('.certificate-details:contains("GUM-123")')), 'number');
  assert.ok($(this.$('.certificate-details:contains("let the force be with you")')), 'comment');
});
