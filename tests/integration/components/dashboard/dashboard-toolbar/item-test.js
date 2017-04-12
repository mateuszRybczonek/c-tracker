import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('dashboard/dashboard-toolbar/item', 'Integration | Component | dashboard/dashboard-toolbar/item', {
  integration: true
});

test('it renders dashboard toolbar item', function(assert) {
  this.setProperties({
    title: 'Title',
    value: 'Value',
  });

  this.render(hbs`
    {{dashboard/dashboard-toolbar/item title=title value=value}}
  `);
  assert.equal(this.$('.toolbar-item-title').text().trim(), 'Title');
  assert.equal(this.$('.toolbar-item-value').text().trim(), 'Value');
});
