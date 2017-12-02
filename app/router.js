import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('recipe', { path: '/recipe/:recipe_id' });
  this.route('favorites', function() {
    this.route('new');
  });
});

export default Router;
