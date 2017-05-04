import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('statistics/mini-stats/item',
  'Integration | Component | statistics/mini-stats/item', {
    integration: true,
  }
);

test('it renders', function(assert) {
  this.setProperties({
    icon: 'envelope',
    header: '30',
    description: 'test description',
  });

  this.render(hbs`
    {{statistics/mini-stats/item
      icon=icon
      header=header
      description=description
    }}
  `);

  assert.equal(this.$('.mini-stats-item > i.fa-envelope').length, 1, 'proper icon');
  assert.equal(this.$('.mini-stats-item > .description > .header').text().trim(),
    '30',
    'proper header value'
  );
  assert.equal(this.$('.mini-stats-item > .description > .text').text().trim(),
    'test description',
    'proper description'
  );
});
