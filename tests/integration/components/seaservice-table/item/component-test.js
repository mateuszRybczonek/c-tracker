import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { seaserviceStub, sessionStub } from 'library-app/tests/stubs/test-stubs';

moduleForComponent('seaservice-table/item', 'Integration | Component | seaservice-table item', {
  integration: true,

  beforeEach() {
    this.setProperties({
      seaservice: seaserviceStub(),
      session: sessionStub(),
    });
  }
});

test('it renders seaservice properly', function(assert) {
  this.render(hbs`{{seaservice-table/item seaservice=seaservice session=session}}`);

  assert.equal(this.$('td').length, 11, 'The right amount of cells is rendered');
  assert.equal($(this.$('td')[0]).text().trim(), 'Ensco plc', 'employer is rendered');
  assert.equal($(this.$('td')[1]).text().trim(), 'Ensco DS-2', 'vessel name is rendered');
  assert.equal($(this.$('td')[2]).text().trim(), 'Drillship', 'vesselType is rendered');
  assert.equal($(this.$('td')[3]).text().trim(), '29677', 'vesselGT is rendered');
  assert.equal($(this.$('td')[4]).text().trim(), '2nd Officer / SDPO', 'position is rendered');
  assert.equal($(this.$('td')[5]).text().trim(), '2012-11-29', 'signOn is rendered');
  assert.equal($(this.$('td')[6]).text().trim(), '2012-11-292013-01-03', 'dates is rendered');
  assert.equal($(this.$('td')[7]).text().trim(), '2013-01-03', 'signOff is rendered');
  assert.ok(this.$('td:contains("35 days")'), 'days on board is rendered');
  assert.ok(this.$('td:contains("420 hours")'), 'dp hours are rendered');
  assert.equal(this.$('.popover-seaservice-details').length, 1, 'info icon is rendered');
});
