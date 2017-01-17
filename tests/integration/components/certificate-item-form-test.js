import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('certificate-item-form', 'Integration | Component | certificate item form', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{certificate-item-form}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#certificate-item-form}}
      template block text
    {{/certificate-item-form}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
