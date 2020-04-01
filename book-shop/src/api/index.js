import get from 'lodash.get';
import logger from '../utils/logger';
import { getRequest } from '../utils/httpHelper';
import { RESOURCE_URL } from '../config';

/**
 * @return {Promise<import('../store/modules/products').Book[]>}
 */
const fetchBooks = async () => {
  logger.debug('Start fetch books info.');
  const data = await getRequest(RESOURCE_URL);
  logger.debug('Done fetch books info.');

  logger.debug('Start Transform books info.');
  const books = get(data, 'books', []).map(book => ({ ...book, price: +book.price }));
  logger.debug('Done Transform books info.');
  return books;
};

export {
  fetchBooks,
};
