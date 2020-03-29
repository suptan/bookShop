import logger from '@/utils/logger';

/**
 *
 * @param {Function} param0.commit
 * @param {import("../products").Book} book
 */
const addBookToCart = ({ commit }, book) => {
  logger.debug('Add book to cart');
  commit('ADD_TO_CART', book);
};

const clearCart = ({ commit }) => {
  logger.debug('Clear items in cart');
  commit('CLEAR_CART');
};

export default {
  addBookToCart,
  clearCart,
};
