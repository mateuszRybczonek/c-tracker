import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('certificate-item', 'Integration | Component | certificate item', {
  integration: true
});

test('it renders certificate properly', function(assert) {
  let certificate = Ember.Object.create({
    name: 'Test Cert',
    number: 'GUM-123',
    user: 'test@gmail.com',
    type: 'STCW',
    issueDate: new Date(2017, 1, 17),
    expiryDate: new Date(2027, 1, 17),
    updatedAt: new Date(2017, 1, 17),
    comment: 'let the force be with you',
  });

  let session = {
    session: {
      currentUser: {
        email: 'test@gmail.com'
      }
    }
  };

  this.set('certificate', certificate);
  this.set('session', session);

  this.render(hbs`{{certificate-item certificate=certificate session=nil}}`);

  assert.equal(this.$('td').length, 4, 'The right amount of cells is rendered');
});
