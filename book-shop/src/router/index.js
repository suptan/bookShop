import Vue from 'vue';
import Router from 'vue-router';

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
  component: () => import(/* webpackPrefetch: true */'@/views/Home'),
}, {
  path: '/page',
  name: 'Page2View',
  component: () => import(/* webpackPrefetch: true */'@/views/Page2'),
}];

export default new Router({
  mode: 'history',
  routes,
});
