import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ui/custom-icon', 'Integration | Component | ui/custom-icon', {
  integration: true,
});

test('rendered icon', function (assert) {
  this.setProperties({
    icon: 'my-icon',
  });

  this.render(hbs`{{ui/custom-icon icon=icon}}`);

  const $icon = this.$('i');

  assert.equal(
    $icon.hasClass(`fa-${this.get('icon')}`),
    true,
    'has appropriate icon name className'
  );
});
