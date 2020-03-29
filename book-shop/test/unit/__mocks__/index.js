import Vue from 'vue';
import Vuex from 'vuex';
import { mockProducts } from './products';
import { mockCartsState } from './carts';

Vue.use(Vuex);

export function createStoreMocks(args = {}) {
  const { carts, products } = args;
  // console.log(products);

  return {
    store: new Vuex.Store({
      modules: {
        products: products || mockProducts,
        carts: carts || mockCartsState,
      },
    }),
  };
}

export const store = createStoreMocks().store;
