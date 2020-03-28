import Vue from 'vue';
import Router from 'vue-router';
import HomeView from '@/views/Home';

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
}];

export default new Router({
  mode: 'history',
  routes,
});
