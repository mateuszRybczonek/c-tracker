import Ember from 'ember';
import { moduleForModel, test } from 'ember-qunit';

const { get } = Ember;

moduleForModel('user', 'Unit | Model | user', {
  needs: [
    'model:certificate',
    'model:seaservice'
  ],
});

test('relationships', function(assert) {
  const User = this.store().modelFor('user');
  const certificatesRelationship = get(User, 'relationshipsByName').get('certificates');
  const seaservicesRelationship = get(User, 'relationshipsByName').get('seaservices');

  assert.equal(certificatesRelationship.key, 'certificates', 'has relationship with certificates');
  assert.equal(certificatesRelationship.kind, 'hasMany', 'kind of relationship with certificates is hasMany');
  assert.equal(seaservicesRelationship.key, 'seaservices', 'has relationship with seaservices');
  assert.equal(seaservicesRelationship.kind, 'hasMany', 'kind of relationship with seaservices is hasMany');
});
