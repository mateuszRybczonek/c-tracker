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

  assert.ok($(this.$('.details-item:contains("Title example")')), 'with Title example');
  assert.ok($(this.$('.details-item:contains("Content example")')), 'with Content example');

});
