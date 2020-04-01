import { fetchBooks } from '@/api';
import logger from '@/utils/logger';

/**
 * @param {Object} context
 * @param {Function} context.commit
 */
const getBooks = (context) => {
  context.commit('SET_IS_FETCH_BOOK', true);
  return fetchBooks()
    .then((res) => {
      logger.debug('Fetch books success');
      context.commit('SET_IS_FETCH_BOOK', false);
      context.commit('BOOKS_UPDATED', res);
      context.commit('FILTER_BOOKS', '');
    })
    .catch((err) => {
      logger.error(JSON.stringify(err));
      context.commit('SET_IS_FETCH_BOOK', false);
    });
};

/**
 *
 * @param {Function} param0.commit
 * @param {string} title
 */
const filterBooks = ({ commit }, title) => {
  logger.debug(`Filter books from the given input ${title}`);
  commit('FILTER_BOOKS', title);
};

export default {
  getBooks,
  filterBooks,
};
