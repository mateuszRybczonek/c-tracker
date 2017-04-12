import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { seaserviceStub, sessionStub } from 'library-app/tests/stubs/test-stubs';

moduleForComponent('dashboard/last-seaservice-table',
  'Integration | Component | dashboard/last-seaservice-table', {
  integration: true
});

test('it does not render last-seaservice-table when no seaservice exists', function(assert) {
  this.set('session', sessionStub);
  this.set('seaservice', undefined);

  this.render(hbs`
    {{dashboard/last-seaservice-table
      seaservice=seaservice
      session=session
    }}
  `);
  assert.equal(
    this.$('h3').length > 0, true , 'with table header'
  );
  assert.equal(this.$('.tbl-header').length > 0, true, 'Table header is rendered');

  assert.equal(
    this.$('.seaservice').length, 0, 'no seaservice is rendered'
  );

  assert.equal(
    this.$('.no-data:contains("No registered seaservice")').length,
    1,
    'No certificate notice is rendered'
  );
});

test('it renders last-seaservice-table when no seaservice exists', function(assert) {
  this.setProperties({
    session: sessionStub,
    seaservice: seaserviceStub(),
  });

  this.render(hbs`
    {{dashboard/last-seaservice-table
      seaservice=seaservice
      session=session
    }}
  `);
  
  assert.equal(
    this.$('h3').length > 0, true , 'with table header'
  );
  assert.equal(this.$('.tbl-header').length > 0, true, 'Table header is rendered');

  assert.equal(
    this.$('.seaservice').length, 1, '1 seaservice is rendered'
  );

  assert.equal(
    this.$('.no-data:contains("No registered seaservice")').length,
    0,
    'No certificate notice is not rendered'
  );
});

