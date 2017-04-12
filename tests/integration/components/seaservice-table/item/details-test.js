import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { seaserviceStub, sessionStub } from 'library-app/tests/stubs/test-stubs';

moduleForComponent('seaservice-table/item/details', 'Integration | Component | seaservice item details', {
  integration: true,
  beforeEach() {
    this.setProperties({
      seaservice: seaserviceStub(),
      session: sessionStub(),
    });
  }
});

test('it renders details properly', function(assert) {

  this.render(hbs`{{
  seaservice-table/item/details
    seaservice=seaservice
    daysOfService=35
    session=session
  }}`);

  assert.equal(this.$('thead tr').length, 9, 'right amount of rows');
  assert.equal(this.$('tbody tr').length, 9, 'right amount of rows');
  assert.equal($(this.$('tbody tr')[0]).text().trim(), 'Ensco plc', 'employer is rendered');
  assert.equal($(this.$('tbody tr')[1]).text().trim(), 'Drillship', 'vesselType is rendered');
  assert.equal($(this.$('tbody tr')[2]).text().trim(), '29677', 'vesselGT is rendered');
  assert.equal($(this.$('tbody tr')[3]).text().trim(), '35', 'days on board are rendered');
  assert.equal($(this.$('tbody tr')[4]).text().trim(), '420', 'dp hours are rendered');
  assert.equal($(this.$('tbody tr')[5]).text().trim(), '2', 'dp class is rendered');
  assert.equal($(this.$('tbody tr')[6]).text().trim(), 'Converteam', 'dp system is rendered');
  assert.equal($(this.$('tbody tr')[7]).text().trim(), 'Drillship', 'vessel details are rendered');
  assert.equal($(this.$('tbody tr')[8]).text().trim(), 'Drilling', 'vessel activities are rendered');
});
