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
    }}
  `);

  const $link = this.$('button a');
  
  assert.equal($link.text(), 'list', 'has proper icon');
});
