import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('login/explore-item', 'Integration | Component | login/explore-item', {
  integration: true,
});

test('it renders explore-item properly', function(assert) {
  this.setProperties({
    icon: 'backup',
    title: 'Access',
    descriptionItems: [
      'Have access to your data anywhere you are.',
      'Use your mobile or desktop to access the data.'
    ],
  });

  this.render(hbs`
    {{login/explore-item
      icon=icon
      title=title
      descriptionItems=descriptionItems
    }}
   `);

  assert.equal(this.$('.explore-icon').length, 1, 'with explore-icon');
  assert.equal(this.$('.title:contains("Access")').length, 1, 'with proper title');
  assert.equal(
    this.$('.description > p').length,
    2,
    'with proper number of description paragraphs'
  );
});
