import actions from '@/store/modules/carts/actions';
import { mockBooks } from '../../../../__mocks__/products';

jest.mock('@/utils/logger', () => ({
  debug: jest.fn(),
}));

describe('carts/actions', () => {
  let mockCommit;

  beforeEach(() => {
    mockCommit = jest.fn();
  });

  describe('addBookToCart', () => {
    it('should commit correct mutation', () => {
      const mockData = mockBooks[0];
      actions.addBookToCart({ commit: mockCommit }, mockData);
      expect(mockCommit).toHaveBeenCalledWith(
        'ADD_TO_CART',
        mockData,
      );
      expect(mockCommit).toHaveBeenCalledWith('CALCULATE_DISCOUNT');
    });
  });

  describe('removeBookFromCart', () => {
    it('should commit correct mutation', () => {
      const input = 1;
      actions.removeBookFromCart({ commit: mockCommit }, input);
      expect(mockCommit).toHaveBeenCalledWith(
        'REMOVE_FROM_CART',
        input,
      );
      expect(mockCommit).toHaveBeenCalledWith('CALCULATE_DISCOUNT');
    });
  });

  describe('decreaseBookInCart', () => {
    it('should commit correct mutation', () => {
      const input = 1;
      actions.decreaseBookInCart({ commit: mockCommit }, input);
      expect(mockCommit).toHaveBeenCalledWith(
        'DECREASE_BOOK_IN_CART',
        input,
      );
      expect(mockCommit).toHaveBeenCalledWith('CALCULATE_DISCOUNT');
    });
  });

  describe('increaseBookInCart', () => {
    it('should commit correct mutation', () => {
      const input = 1;
      actions.increaseBookInCart({ commit: mockCommit }, input);
      expect(mockCommit).toHaveBeenCalledWith(
        'INCREASE_BOOK_IN_CART',
        input,
      );
      expect(mockCommit).toHaveBeenCalledWith('CALCULATE_DISCOUNT');
    });
  });

  describe('clearCart', () => {
    it('should commit correct mutation', () => {
      actions.clearCart({ commit: mockCommit });
      expect(mockCommit).toHaveBeenCalledWith('CLEAR_CART');
      expect(mockCommit).toHaveBeenCalledWith('CALCULATE_DISCOUNT');
    });
  });
});
