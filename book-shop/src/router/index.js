import Vue from 'vue';
import Router from 'vue-router';
import HomeView from '@/views/Home';
import Page2View from '@/views/Page2';

Vue.use(Router);

/**
 * @typedef {Object} route
 * @property {string} path
 * @property {string} name
 * @property {Object} component
 */
const routes = [{
  path: '/',
  name: 'HomeView',
  component: HomeView,
}, {
  path: '/page',
  name: 'Page2View',
  component: Page2View,
}];

export default new Router({
  mode: 'history',
  routes,
});
