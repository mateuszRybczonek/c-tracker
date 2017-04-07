import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ui/search-input', 'Integration | Component | ui | search input', {
  integration: true
});

test('it renders', function(assert) {
  this.set('searchTerm', '');

  this.render(hbs`
    {{ui/search-input
      class='toolbar-search'
      value=searchTerm
      onChange=(action (mut searchTerm))
    }}
  `);

  assert.equal(this.$().text().trim(), 'search', 'has proper icon');
  assert.equal(this.get('searchTerm'), '', 'with empty searchTerm');
});
