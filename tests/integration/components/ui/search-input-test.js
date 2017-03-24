import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ui/search-input', 'Integration | Component | ui | search input', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`
    {{ui/search-input
      value=searchTerm
      onChange=(action (mut searchTerm))
    }}
  `);

  assert.equal(this.$().text().trim(), 'search');
});
