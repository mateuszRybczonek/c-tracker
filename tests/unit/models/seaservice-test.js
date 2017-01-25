import Ember from 'ember';
import { moduleForModel, test } from 'ember-qunit';

const { get } = Ember;

moduleForModel('seaservice', 'Unit | Model | seaservice', {
  needs: [
    'model:user'
  ],
});

test('user relationship', function(assert) {
  const Seaservice = this.store().modelFor('seaservice');
  const relationship = get(Seaservice, 'relationshipsByName').get('user');

  assert.equal(relationship.key, 'user', 'has relationship with user');
  assert.equal(relationship.kind, 'belongsTo', 'kind of relationship is belongsTo');
});
