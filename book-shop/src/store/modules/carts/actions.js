import logger from '@/utils/logger';

/**
 *
 * @param {import("../products").Book} book
 */
const addBookToCart = ({ commit }, book) => {
  logger.debug('Add book to cart');
  commit('ADD_TO_CART', book);
  commit('CALCULATE_DISCOUNT');
};

/**
 *
 * @param {string} id
 */
const removeBookFromCart = ({ commit }, id) => {
  logger.debug('Remove book from cart');
  commit('REMOVE_FROM_CART', id);
  commit('CALCULATE_DISCOUNT');
};

/**
 *
 * @param {string} id
 */
const decreaseBookInCart = ({ commit }, id) => {
  logger.debug('Decrease book in cart');
  commit('DECREASE_BOOK_IN_CART', id);
  commit('CALCULATE_DISCOUNT');
};

/**
 *
 * @param {string} id
 */
const increaseBookInCart = ({ commit }, id) => {
  logger.debug('Increase book in cart');
  commit('INCREASE_BOOK_IN_CART', id);
  commit('CALCULATE_DISCOUNT');
};

const clearCart = ({ commit }) => {
  logger.debug('Clear items in cart');
  commit('CLEAR_CART');
};

/**
 * @param {function():void)} param0.commit
 * @param {number} amount
 */
const updateChange = ({ commit }, amount) => {
  commit('UPDATE_CHANGE', amount);
};

/**
 * @param {number} cash
 */
const updateCash = ({ commit }, cash) => {
  commit('UPDATE_CASH', cash);
};

export default {
  addBookToCart,
  removeBookFromCart,
  decreaseBookInCart,
  increaseBookInCart,
  clearCart,
  updateChange,
  updateCash,
};
