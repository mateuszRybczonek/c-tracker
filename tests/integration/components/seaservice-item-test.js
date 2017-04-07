import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { seaserviceStub, sessionStub } from '../../stubs/test-stubs';

moduleForComponent('seaservice-item', 'Integration | Component | seaservice item', {
  integration: true,

  beforeEach() {
    this.setProperties({
      seaservice: seaserviceStub(),
      session: sessionStub(),
    });
  }
});

test('it renders seaservice properly', function(assert) {
  this.render(hbs`{{seaservice-item seaservice=seaservice session=session}}`);

  assert.equal(this.$('td').length, 9, 'The right amount of cells is rendered');
  assert.equal($(this.$('td')[0]).text().trim(), 'Ensco plc', 'employer is rendered');
  assert.equal($(this.$('td')[1]).text().trim(), 'Ensco DS-2', 'vessel name is rendered');
  assert.equal($(this.$('td')[2]).text().trim(), 'Drillship', 'vesselType is rendered');
  assert.equal($(this.$('td')[3]).text().trim(), '29677', 'vesselGT is rendered');
  assert.equal($(this.$('td')[4]).text().trim(), '2nd Officer / SDPO', 'position is rendered');
  assert.equal($(this.$('td')[5]).text().trim(), '2012-11-29', 'signOn is rendered');
  assert.equal($(this.$('td')[6]).text().trim(), '2013-01-03', 'signOff is rendered');
  assert.equal(this.$('td:contains("35 days")'), '2013-01-03', 'signOff is rendered');
  assert.equal(this.$('td:contains("420 hours")'), '2013-01-03', 'signOff is rendered');
  assert.equal(this.$('.popover-seaservice-details').length, 1, 'info icon is rendered');
  assert.equal(this.$('.edit-seaservice').length, 1, 'edit icon is rendered');
  assert.equal(this.$('.delete-seaservice').length, 1, 'delete icon is rendered');
});
