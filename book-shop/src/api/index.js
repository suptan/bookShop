import get from 'lodash.get';
import logger from '../utils/logger';
import { getRequest } from '../utils/httpHelper';
import { RESOURCE_URL } from '../config';

/**
 * @return {Promise<import('../store/modules/products').Book[]>}
 */
const fetchBooks = async () => {
  logger.debug('Start fetch books info.');
  const result = await getRequest(RESOURCE_URL);
  return get(result, 'books', []);
};

export {
  fetchBooks,
};
