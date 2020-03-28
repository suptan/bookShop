import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const mockBooks = [{
  cover: 'pic1',
  price: '111',
  title: 'foo',
  id: '330',
}, {
  cover: 'pic2',
  price: '123',
  title: 'bar',
  id: '431',
}];

const mockProducts = {
  namespaced: true,
  state: { books: mockBooks },
  actions: { getBooks: jest.fn() },
  getters: { books: () => mockBooks },
  mutations: {
    BOOKS_UPDATED: jest.fn(() => mockBooks),
  },
};

export function createStoreMocks(args = {}) {
  const { products } = args;
  // console.log(products);

  return {
    store: new Vuex.Store({
      modules: {
        products: products || mockProducts,
      },
    }),
  };
}

export const store = createStoreMocks().store;
