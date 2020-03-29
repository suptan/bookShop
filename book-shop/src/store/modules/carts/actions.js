import logger from '@/utils/logger';

/**
 *
 * @param {Function} param0.commit
 * @param {import("../products").Book} book
 */
const addBookToCart = ({ commit }, book) => {
  logger.debug('Add book to cart');
  commit('ADD_TO_CART', book);
  commit('CALCULATE_DISCOUNT');
};

/**
 *
 * @param {Function} param0.commit
 * @param {number} id
 */
const removeBookFromCart = ({ commit }, id) => {
  logger.debug('Remove book from cart');
  commit('REMOVE_FROM_CART', id);
  commit('CALCULATE_DISCOUNT');
};

const decreaseBookInCart = ({ commit }, id) => {
  logger.debug('Decrease book in cart');
  commit('DECREASE_BOOK_IN_CART', id);
  commit('CALCULATE_DISCOUNT');
};

const increaseBookInCart = ({ commit }, id) => {
  logger.debug('Increase book in cart');
  commit('INCREASE_BOOK_IN_CART', id);
  commit('CALCULATE_DISCOUNT');
};

const clearCart = ({ commit }) => {
  logger.debug('Clear items in cart');
  commit('CLEAR_CART');
  commit('CALCULATE_DISCOUNT');
};

export default {
  addBookToCart,
  removeBookFromCart,
  decreaseBookInCart,
  increaseBookInCart,
  clearCart,
};
