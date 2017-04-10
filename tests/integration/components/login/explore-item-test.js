import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('login/explore-item', 'Integration | Component | login/explore-item', {
  integration: true,
});

test('it renders explore-item properly', function(assert) {
  this.setProperties({
    icon: 'backup',
  });

  this.render(hbs`
    {{#login/explore-item icon='backup'}}<h2 class='title'>Title</h2>{{/login/explore-item}}
    `);

  assert.equal(this.$('.explore-icon').length, 1, 'with explore-icon');
  assert.equal(this.$('.title').length, 1, 'with yielded content');
});
