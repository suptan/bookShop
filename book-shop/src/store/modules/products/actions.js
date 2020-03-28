import { fetchBooks } from '@/api';
import logger from '@/utils/logger';

/**
 * @param {Object} context
 * @param {Function} context.commit
 */
const getBooks = context => fetchBooks()
  .then((res) => {
    context.commit('BOOKS_UPDATED', res);
  })
  .catch((err) => {
    logger.error(JSON.stringify(err));
  });

export default {
  getBooks,
};
