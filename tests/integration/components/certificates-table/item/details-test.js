import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { certificateStub, sessionStub } from 'library-app/tests/stubs/test-stubs';

moduleForComponent('certificates-table/item/details', 'Integration | Component | certificate item details', {
  integration: true,
  beforeEach() {
    this.setProperties({
      certificate: certificateStub(new Date(2027, 1, 17)),
      session: sessionStub(),
    });
  }
});

test('it renders details properly', function(assert) {
  this.render(hbs`{{certificates-table/item/details certificate=certificate session=session}}`);

  assert.equal(this.$('thead tr').length, 3, 'right amount of rows');
  assert.equal(this.$('tbody tr').length, 3, 'right amount of rows');
  assert.equal($(this.$('tbody tr')[0]).text().trim(), 'Fri Feb 17 2017 00:00:00 GMT+0100 (CET)', 'issue date');
  assert.equal($(this.$('tbody tr')[1]).text().trim(), 'GUM-123', 'number');
  assert.equal($(this.$('tbody tr')[2]).text().trim(), 'let the force be with you', 'comment');
});
