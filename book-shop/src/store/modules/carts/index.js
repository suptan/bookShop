import actions from './actions';
import getters from './getters';
import mutations from './mutations';

/**
 * @typedef {Object} BookItem
 * @property {number} amount
 * @property {number} total
 */
/**
 * @typedef {Object} CartItem
 * @property {import("../products").Book[] & BookItem[]} books
 */
/**
 * @typedef {Object} Cart
 * @property {CartItem} item
 * @property {number} total
 */
/**
 * @typedef {Object} CartState
 * @property {Cart} cart
 */
/**
 * @type {CartState} state
 */
const state = {
  cart: {
    item: {
      books: [],
    },
    total: 0,
  },
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
