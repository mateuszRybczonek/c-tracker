import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('details-item', 'Integration | Component | details item', {
  integration: true,
});

test('it renders details-item properly', function(assert) {
  this.setProperties({
    title: 'Title example',
    content: 'Content example',
  });

  this.render(hbs`{{details-item title=title content=content}}`);

  assert.equal(this.$('thead > tr').text().trim(), "Title example", 'with Title example');
  assert.equal(this.$('tbody > tr').text().trim(), "Content example", 'with Content example');
});
