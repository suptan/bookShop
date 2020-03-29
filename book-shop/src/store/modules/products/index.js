import actions from './actions';
import getters from './getters';
import mutations from './mutations';

/**
 * @typedef {Object} Book
 * @property {string} cover
 * @property {string} price
 * @property {string} title
 * @property {string} id
 */
/**
 * @typedef {Object} BooksState
 * @property {Book[]} books
 * @property {Book[]} displayBooks
 */
/**
 * @type {BooksState} state
 */
const state = {
  books: [],
  displayBooks: [],
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
