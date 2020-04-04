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
  path: '/payment',
  name: 'PaymentView',
  component: () => import(/* webpackPrefetch: true */'@/views/Payment'),
}, {
  path: '/thank-you',
  name: 'ThankYouView',
  component: () => import(/* webpackPrefetch: true */'@/views/ThankYou'),
}];

export default new Router({
  mode: 'history',
  routes,
});
