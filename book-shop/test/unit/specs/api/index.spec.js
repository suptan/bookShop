import { fetchBooks } from '@/api';
import * as httpHelper from '@/utils/httpHelper';
import { mockBooks } from '../../__mocks__/products';

jest.mock('@/utils/logger');

describe('api', () => {
  describe('fetchBooks', () => {
    it('should return valid data', async () => {
      const mockResponse = mockBooks.map(book => ({ ...book, price: book.price.toString() }));
      httpHelper.getRequest = jest.fn(() => ({ books: mockResponse }));
      const result = await fetchBooks();

      result.map((r, i) => { // eslint-disable-line
        expect(r).toEqual(mockBooks[i]);
      });
      expect(httpHelper.getRequest).toHaveBeenCalledWith('foo');
    });
  });
});
