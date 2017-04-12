import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('dashboard/dashboard-toolbar', 'Integration | Component | dashboard/dashboard-toolbar', {
  integration: true
});

test('it renders dashboard toolbar', function(assert) {
  const dashboardToolbarItems = [
    {
      class: '',
      title: 'Days on board last 12 months',
      value: 120,
    },
    {
      class: '',
      title: 'First expiring certificate',
      value: 'Certificate',
      visible: true,
    },
  ];

  this.set('dashboardToolbarItems', dashboardToolbarItems);

  this.render(hbs`
    {{dashboard/dashboard-toolbar dashboardToolbarItems=dashboardToolbarItems}}
  `);
  assert.equal(this.$('li').length, 2, 'with proper number of items');
});
