import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('contact');

  this.route('admin', function() {
    this.route('invitations');
    this.route('contacts');
  });

  this.route('posts', function() {
    this.route('new');
    this.route('edit', { path: '/:post_id/edit' });
  });
  this.route('snippets', function() {
    this.route('new');
    this.route('edit', { path: '/:snippet_id/edit' });
  });
});

export default Router;
