import Vue from 'vue';
import Vuex from 'vuex';
import productsModule from './modules/products';
import cartsModule from './modules/carts';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    products: productsModule,
    carts: cartsModule,
  },
});
