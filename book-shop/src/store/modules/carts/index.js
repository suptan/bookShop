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
 * @property {number} subTotal
 * @property {number} total
 * @property {Discount} discount
 */
/**
 * @typedef {Object} Discount
 * @property {DiscountBooks} books
 * @property {number} amount
 */
/**
 * @typedef {Object} DiscountBooks
 * @property {Object} harry
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
    subTotal: 0,
    total: 0,
    change: 0,
    cash: 0,
    discount: {
      books: {
        harry: {},
      },
      amount: 0,
    },
  },
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
