import * as api from '@/api';
import actions from '@/store/modules/products/actions';
import logger from '@/utils/logger';

jest.mock('@/utils/logger', () => ({
  debug: jest.fn(),
  error: jest.fn(),
}));

describe('products/actions', () => {
  describe('getBooks', () => {
    it('should commit correct mutation', async () => {
      const mockData = 1;
      const mockCommit = jest.fn();
      api.fetchBooks = jest.fn(() => Promise.resolve(mockData));
      await actions.getBooks({ commit: mockCommit });

      expect(mockCommit).toHaveBeenCalledWith(
        'BOOKS_UPDATED',
        mockData,
      );
      expect(mockCommit).toHaveBeenCalledWith(
        'FILTER_BOOKS',
        '',
      );
    });
    it('should log error when can\'t fetch data', async () => {
      const mockError = { msg: 'some error' };
      api.fetchBooks = jest.fn(() => Promise.reject(mockError));
      await actions.getBooks();

      expect(logger.error).toHaveBeenCalledWith(JSON.stringify(mockError));
    });
  });
});
