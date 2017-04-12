import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { seaserviceStub, sessionStub } from 'library-app/tests/stubs/test-stubs';

moduleForComponent('dashboard/last-seaservice-table/item',
  'Integration | Component | dashboard/last-seaservice-table/item', {
  integration: true
});

test('it renders certificates table item', function(assert) {
  this.setProperties({
    session: sessionStub,
    seaservice: seaserviceStub(),
  });

  this.render(hbs`
    {{dashboard/last-seaservice-table/item
      seaservice=seaservice
      session=session
    }}
  `);

  assert.equal(this.$('td').length, 4, 'with proper number of cells');
  assert.equal($(this.$('td')[0]).text().trim(), 'Ensco DS-2', 'with proper vessel name');
  assert.equal($(this.$('td')[1]).text().trim(), '2nd Officer / SDPO', 'with proper position date');
  assert.equal($(this.$('td')[2]).text().trim(), '2012-11-29', 'with proper signOn date');
  assert.equal($(this.$('td')[3]).text().trim(), '2013-01-03', 'with proper signOff date');
});
