import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { seaserviceStub, sessionStub } from 'library-app/tests/stubs/test-stubs';


moduleForComponent('dashboard/certificates-renewed-seaservice-table/item',
  'Integration | Component | dashboard/certificates-renewed-seaservice-table/item', {
  integration: true
});

test('it renders certificates table item', function(assert) {
  let certificate = Ember.Object.create({
    name: 'Jedi master license',
    number: 'GUM-123',
    user: 'test@gmail.com',
    type: 'STCW',
    issueDate: new Date(2012, 1, 17),
    expiryDate: new Date(2017, 1, 17),
    updatedAt: new Date(2015, 1, 17),
    comment: 'let the force be with you',
    renewedBasedOnSeaservice: true,
    daysOfServiceToRenew: 365,
  });

  this.setProperties({
    certificate: certificate,
    session: sessionStub,
    seaservices: [ seaserviceStub() ],
  });

  this.render(hbs`
    {{dashboard/certificates-renewed-seaservice-table/item
      certificate=certificate
      seaservices=seaservices
      session=session
    }}
  `);

  assert.equal(this.$('td').length, 5, 'with proper number of cells');
  assert.equal($(this.$('td')[0]).text().trim(), 'Jedi master license', 'with proper certifcate name');
  assert.equal($(this.$('td')[1]).text().trim(), 'Fri Feb 17 2017 00:00:00 GMT+0100 (CET)', 'with proper expiry date');
  assert.equal($(this.$('md-progress-linear > .md-mode-determinate > .md-bar.md-bar2')).length, 1, 'with linear progress bar');
  assert.equal($(this.$('td')[3]).text().trim(), '35 / 365', 'with proper seaservice stats');
  assert.equal($(this.$('td')[4]).text().trim(), '330', 'with proper missingSeaservice');
});
