import mutations from '@/store/modules/carts/mutations';
import { mockBooks } from '../../../../__mocks__/products';

describe('products/mutations', () => {
  describe('ADD_TO_CART', () => {
    let books;
    let state;

    beforeEach(() => {
      books = [];
      state = { cart: { item: { books }, subTotal: 0 } };
    });
    it('should add new book when cart is empty', () => {
      const input = Array.from(mockBooks);
      mutations.ADD_TO_CART(state, input[0]);

      expect(state.cart.item).toEqual(
        expect.objectContaining({
          books: expect.arrayContaining([
            expect.objectContaining({
              ...mockBooks[0],
              amount: 1,
              total: mockBooks[0].price,
            }),
          ]),
        }),
      );
      expect(state.cart.subTotal).toBe(+mockBooks[0].price);
    });

    it('should increase amount of book when add the same book', () => {
      mutations.ADD_TO_CART(state, mockBooks[0]);
      mutations.ADD_TO_CART(state, mockBooks[0]);

      expect(state.cart.item.books.length).toEqual(1);
      expect(state.cart.item).toEqual(
        expect.objectContaining({
          books: expect.arrayContaining([
            expect.objectContaining({
              ...mockBooks[0],
              amount: 2,
              total: mockBooks[0].price * 2,
            }),
          ]),
        }),
      );
      expect(state.cart.subTotal).toBe(+mockBooks[0].price * 2);
    });

    it('should add new book when found different books', () => {
      mutations.ADD_TO_CART(state, mockBooks[0]);
      mutations.ADD_TO_CART(state, mockBooks[1]);
      expect(state.cart.item.books.length).toEqual(2);
      expect(state.cart.item).toEqual(
        expect.objectContaining({
          books: expect.arrayContaining([
            expect.objectContaining({
              ...mockBooks[0],
              amount: 1,
              total: mockBooks[0].price,
            }),
            expect.objectContaining({
              ...mockBooks[1],
              amount: 1,
              total: mockBooks[1].price,
            }),
          ]),
        }),
      );
      expect(state.cart.subTotal).toBe(+mockBooks[0].price + mockBooks[1].price);
    });
  });

  describe('REMOVE_FROM_CART', () => {
    let books;
    let subTotal;
    let state;

    beforeEach(() => {
      const bookItems = [
        {
          ...mockBooks[0],
          total: mockBooks[0].price,
        }, {
          ...mockBooks[1],
          total: mockBooks[1].price,
        },
      ];
      books = Array.from(bookItems);
      subTotal = 1000;
      state = { cart: { item: { books: Array.from(bookItems) }, subTotal } };
    });

    it('should not change anything when remove book that not in cart', () => {
      mutations.REMOVE_FROM_CART(state, 0);

      expect(state).toBe(state);
    });

    it('should be able to remove book from cart', () => {
      const removeBook = books[0];
      mutations.REMOVE_FROM_CART(state, removeBook.id);

      const result = state.cart.item.books.find(book => book.id === removeBook.id);
      expect(result).toBeFalsy();

      const resultSubTotal = state.cart.item.books.reduce((sum, book) => book.price + sum, 0);
      expect(resultSubTotal).toBe(subTotal - removeBook.price);
    });

    it.only('should be able to remove all books from cart', () => {
      const removeSubTotal = books.reduce((sum, { id, price }) => {
        mutations.REMOVE_FROM_CART(state, id);
        sum += price;  // eslint-disable-line
        return sum;
      }, 0);

      expect(state.cart.item.books.length).toBe(0);

      const resultSubTotal = state.cart.item.books.reduce((sum, book) => book.price + sum, 0);

      expect(resultSubTotal).toBe(0);
      expect(state.cart.subTotal).toBe(subTotal - removeSubTotal);
    });

    it('should be able to remove all books that in and not in cart', () => {
          books.map(({ id }) => { // eslint-disable-line
        mutations.REMOVE_FROM_CART(state, id);
      });
      mutations.REMOVE_FROM_CART(state, 'id');
      mutations.REMOVE_FROM_CART(state, '1');

      expect(state.cart.item.books.length).toBe(0);
    });
  });

  describe('DECREASE_BOOK_IN_CART');
  describe('INCREASE_BOOK_IN_CART');
  describe('EDIT_BOOK_CART');
  describe('CLEAR_CART');
  describe('CALCULATE_DISCOUNT');
});
