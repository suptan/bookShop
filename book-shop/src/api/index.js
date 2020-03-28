import logger from '../utils/logger';
import { getRequest } from '../utils/httpHelper';

/**
 * @return {Promise<import('../store/modules/products').Book[]>}
 */
const fetchBooks = async () => {
  logger.debug('Start fetch books info.');
  const result = await getRequest({ path: 'books.json' });
  return result;
};

export {
  fetchBooks,
};
