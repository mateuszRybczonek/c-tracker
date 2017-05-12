import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ui/link-button', 'Integration | Component | ui | link button', {
  integration: true
});

test('it renders', function (assert) {
  this.setProperties({
    icon: 'my-icon',
  });

  this.render(hbs`
    {{ui/link-button
      destination='index'
      iconButton=true
      icon="list"
      tooltipText='List all'
    }}
  `);

  const $link = this.$('a button');

  assert.equal($link.text().trim(), 'list', 'has proper icon');
});
