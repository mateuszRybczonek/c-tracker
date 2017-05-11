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

  assert.ok($(this.$('.vessel-details:contains("Ensco plc")')), 'employer');
  assert.ok($(this.$('.vessel-details:contains("Drillship")')), 'vesselType');
  assert.ok($(this.$('.vessel-details:contains("29677")')), 'GT');
  assert.ok($(this.$('.vessel-details:contains("35")')), 'days on board');
  assert.ok($(this.$('.vessel-details:contains("420")')), 'dp hours');
  assert.ok($(this.$('.vessel-details:contains("2")')), 'dp class');
  assert.ok($(this.$('.vessel-details:contains("Converteam")')), 'dp system');
  assert.ok($(this.$('.vessel-details:contains("Drilling")')), 'vessel activities');
});
