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
    this.route('seaservice', function() {
      this.route('new');
      this.route('edit', { path: '/:seaservice_id/edit' });
    });
    this.route('dashboard');

    this.route('statistics');
  });
  this.route('login');
  this.route('shared-cv', { path: '/:user_id/shared-cv'}, function() {
    this.route('certificates');
    this.route('seaservice');
  });
});

export default Router;
