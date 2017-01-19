import { moduleForModel, test } from 'ember-qunit';

moduleForModel('certificate', 'Unit | Model | certificate', {});

test('certificate properties', function(assert) {
  const model = this.subject({
    name: 'Test Cert',
    number: 'GUM-123',
    user: 'test@gmail.com',
    type: 'STCW',
    issueDate: new Date(2017, 1, 17),
    expiryDate: new Date(2027, 1, 17),
    comment: 'let the force be with you',
  });

  assert.equal(model.get('name'), 'Test Cert', 'has name property');
  assert.equal(model.get('number'), 'GUM-123', 'has number property');
  assert.equal(model.get('user'), 'test@gmail.com', 'has user property');
  assert.equal(model.get('type'), 'STCW', 'has type property');
  assert.equal(model.get('issueDate'), 'Fri Feb 17 2017 00:00:00 GMT+0100 (CET)', 'has issueDate property');
  assert.equal(model.get('expiryDate'), 'Wed Feb 17 2027 00:00:00 GMT+0100 (CET)', 'has expiryDate property');
  assert.ok(model.get('updatedAt'), 'has updatedAt property');
  assert.equal(model.get('comment'), 'let the force be with you', 'has comment property');
  
  
});
