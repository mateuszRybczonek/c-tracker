import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('users', function() {
    this.route('certificates', function() {
      this.route('new');
      this.route('edit', { path: '/:certificate_id/edit' });
    });
    this.route('dashboard');

  });
  this.route('login');
});

export default Router;
