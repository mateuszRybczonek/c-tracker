import Ember from 'ember';
import sinon from 'sinon';
import { moduleFor, test } from 'ember-qunit';

moduleFor('route:index', 'Unit | Route | index');

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});

test('beforeModel hook', function(assert) {
  const dataProvider = [
    {
      isAuthenticated: false,
      transitionTarget: 'login',
    },
    {
      isAuthenticated: true,
      transitionTarget: 'users.dashboard',
    },
  ];

  dataProvider.forEach(dataSet => {
    const route = this.subject();
    const transitionToStub = sinon.spy();

    route.setProperties({
      transitionTo: transitionToStub,
      session: Ember.Object.create({
        isAuthenticated: dataSet.isAuthenticated,
      }),
    });

    route.beforeModel();

    assert.ok(
      transitionToStub.calledWith(dataSet.transitionTarget), 'redirects to proper route');
  });
});
