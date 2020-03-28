import Vue from 'vue';
import Vuex from 'vuex';
import productsModule from './modules/products';

Vue.use(Vuex);

console.log(productsModule);


export default new Vuex.Store({
  modules: {
    products: productsModule,
  },
});
