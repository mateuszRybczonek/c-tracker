import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('statistics/mini-stats',
  'Integration | Component | statistics/mini-stats', {
    integration: true,
  }
);

test('it renders', function(assert) {
  this.set('miniStatsItems', [{
      icon: 'ship',
      header: '28 days',
      description: 'longest stay on board',
    }, {
      icon: 'ship',
      header: '28 days',
      description: 'longest stay on board',
    }, {
      icon: 'ship',
      header: '28 days',
      description: 'longest stay on board',
    }, {
      icon: 'ship',
      header: '28 days',
      description: 'longest stay on board',
    }
  ]);

  this.render(hbs`
    {{statistics/mini-stats miniStatsItems=miniStatsItems}}`);

  assert.equal(this.$('.mini-stats-item').length, 4, 'proper number of items');
});
