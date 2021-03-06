import Ember from 'ember';
import { moduleForModel, test } from 'ember-qunit';

const { get } = Ember;

moduleForModel('certificate', 'Unit | Model | certificate', {
  needs: [
    'model:user'
  ],
});

test('user relationship', function(assert) {
  const Certificate = this.store().modelFor('certificate');
  const relationship = get(Certificate, 'relationshipsByName').get('user');

  assert.equal(relationship.key, 'user', 'has relationship with user');
  assert.equal(relationship.kind, 'belongsTo', 'kind of relationship is belongsTo');
});
