import { moduleFor, test } from 'ember-qunit';

moduleFor('controller:certificates/index', 'Unit | Controller | certificates | index', {
});

test('search by name', function(assert) {
  let controller = this.subject();

  let certificate1 = Ember.Object.create({
    name: 'Jedi master license',
    number: 'GUM-123',
    user: 'test@gmail.com',
    type: 'STCW',
    issueDate: new Date(2017, 1, 17),
    expiryDate: new Date(2027, 1, 17),
    updatedAt: new Date(2017, 1, 17),
    comment: 'let the force be with you',
  });

  let certificate2 = Ember.Object.create({
    name: 'Padawan (Jedi Apprentice) certificate',
    number: 'GUM-345',
    user: 'test@gmail.com',
    type: 'STCW',
    issueDate: new Date(2017, 1, 17),
    expiryDate: new Date(2027, 1, 17),
    updatedAt: new Date(2017, 1, 17),
    comment: 'you can sense the force already',
  });

  let certificates = [ certificate1, certificate2 ];

  controller.set('model', certificates);

  const dataProvider = [
    {
      searchTerm: 'Non existing name',
      result: [],
      message: 'returns empty array for no match',
    },
    {
      searchTerm: 'Jedi',
      result: [ certificate1, certificate2],
      message: 'returns multiple elements for multiple matches',
    },
    {
      searchTerm: 'master',
      result: [ certificate1],
      message: 'returns single element for single match',
    },
  ];


  dataProvider.forEach(testCase => {
    controller.set('searchTerm', testCase.searchTerm);
    assert.deepEqual(controller.get('matchingCertificates'), testCase.result, testCase.message)
  });
});
