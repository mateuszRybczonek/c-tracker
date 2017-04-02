import { test } from 'qunit';
import moduleForAcceptance from 'library-app/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | login');

test('visiting /login', function(assert) {
  visit('/login');

  andThen(function() {
    assert.equal(currentURL(), '/login', 'directs to proper url');
    assert.equal(find('.title-pic').length, 1, 'Login section is rendered');

    assert.equal(find('.navbar-logged-out').length, 1, 'Navbar for logged out user is rendered');
    assert.equal(find('.navbar-brand:contains("C-tracker")').length, 1, 'Navbar has app name');
    assert.equal(find('.explore-section').length, 1, 'Login section is rendered');
    assert.equal(find('.explore-item').length, 3, 'Explore section has 3 items');
    assert.equal(find('.login-btn:contains("Login with")').length, 1,
      'Login button is rendered with proper text'
    );
  });
});
