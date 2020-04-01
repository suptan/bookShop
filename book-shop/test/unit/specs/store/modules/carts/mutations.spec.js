import mutations from '@/store/modules/carts/mutations';
import { HARRY_DISCOUNT } from '@/utils/constant';
import { mockBooks } from '../../../../__mocks__/products';

jest.mock('vue', () => ({
  set: jest.fn((obj, index, newObj) => {
    obj[index] = newObj; //eslint-disable-line
  }),
}));

describe('products/mutations', () => {
  describe('ADD_TO_CART', () => {
    let books;
    let state;

    beforeEach(() => {
      books = [];
      state = {
        cart: {
          item: { books },
          subTotal: 0,
          discount: { books: { harry: {} } },
        },
      };
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

    it('should add discount key when found Harry Potter series', () => {
      const mockHarry = {
        id: 'e4g',
        title: 'Harry Potter Part 1',
        price: 200,
      };
      mutations.ADD_TO_CART(state, mockHarry);

      const resultKeys = Object.keys(state.cart.discount.books.harry);
      expect(resultKeys.length).toEqual(1);
      expect(resultKeys[0]).toEqual(mockHarry.id);
      expect(state.cart.discount.books.harry[resultKeys]).toEqual(mockHarry.price);
    });

    it('should add discount key one time when found duplicate Harry Potter series', () => {
      const mockHarry = {
        id: 'e4g',
        title: 'Harry Potter Part 1',
        price: 200,
      };
      mutations.ADD_TO_CART(state, mockHarry);
      mutations.ADD_TO_CART(state, mockHarry);

      const resultKeys = Object.keys(state.cart.discount.books.harry);
      expect(resultKeys.length).toEqual(1);
      expect(resultKeys[0]).toEqual(mockHarry.id);
      expect(state.cart.discount.books.harry[resultKeys]).toEqual(mockHarry.price);
    });

    it('should add discount keys when found many unique Harry Potter series', () => {
      const mockHarry = [
        { id: 'e4g', title: 'Harry Potter Part 1', price: 20 },
        { id: '1rf5', title: 'Harry Potter Part 12', price: 200 },
        { id: 'nj8@', title: 'Harry Potter Part 11', price: 2000 },
      ];
      const mockResult = mockHarry.reduce((obj, harry) => {
        obj[harry.id] = harry.price; // eslint-disable-line
        return obj;
      }, {});

      mockHarry.map((input) => { // eslint-disable-line array-callback-return
        mutations.ADD_TO_CART(state, input);
      });

      const resultKeys = Object.keys(state.cart.discount.books.harry);
      expect(resultKeys.length).toEqual(3);
      expect(state.cart.discount.books.harry).toEqual(mockResult);
    });
  });

  describe('REMOVE_FROM_CART', () => {
    let books;
    let subTotal;
    let state;
    let mockHarry;

    beforeEach(() => {
      const bookItems = [
        {
          ...mockBooks[0],
          total: mockBooks[0].price,
        }, {
          ...mockBooks[1],
          total: mockBooks[1].price,
        },
        { id: '@riop', price: 0, total: 0 },
        { id: '6gb3', price: 0, total: 0 },
        { id: '1112', price: 0, total: 0 },
      ];
      books = Array.from(bookItems);
      subTotal = 1000;
      mockHarry = {
        '@riop': 1,
        '6gb3': 2,
        1112: 3,
      };
      state = {
        cart: {
          item: { books: Array.from(bookItems) },
          subTotal,
          discount: { books: { harry: mockHarry } },
        },
      };
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
      expect(state.cart.subTotal).toBe(subTotal - removeBook.price);
    });

    it('should be able to remove all books from cart', () => {
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

    it('should be able to remove harry discount key', () => {
      mutations.REMOVE_FROM_CART(state, '1112');

      expect(mockHarry[1112]).toBe(undefined);
      expect(mockHarry['6gb3']).toBe(2);
      expect(mockHarry['@riop']).toBe(1);
    });

    it('should not remove harry discount key', () => {
      mutations.REMOVE_FROM_CART(state, mockBooks[0].id);

      expect(mockHarry).toEqual({ '@riop': 1, '6gb3': 2, 1112: 3 });
    });
  });

  describe('DECREASE_BOOK_IN_CART', () => {
    let state;
    let books;
    beforeEach(() => {
      books = [{
        id: '123',
        amount: 2,
        price: 100,
      }, {
        id: '333',
        amount: 2,
      }];
      state = { cart: { item: { books }, subTotal: 1000 } };
    });
    it('should be able to decrease the amount of book in cart', () => {
      const id = '123';
      mutations.DECREASE_BOOK_IN_CART(state, id);
      mutations.DECREASE_BOOK_IN_CART(state, id);
      mutations.DECREASE_BOOK_IN_CART(state, id);

      expect(state.cart.subTotal).toEqual(800);
      expect(state.cart.item.books[0].amount).toEqual(0);
      expect(state.cart.item.books[1].amount).toEqual(2);
    });

    it('should not change anything when try to decrease the amount of book out cart', () => {
      mutations.DECREASE_BOOK_IN_CART(state, '0');
      mutations.DECREASE_BOOK_IN_CART(state, '1');
      expect(state.cart.subTotal).toEqual(1000);
      expect(state.cart.item.books[0].amount).toEqual(2);
      expect(state.cart.item.books[1].amount).toEqual(2);
    });
  });

  describe('INCREASE_BOOK_IN_CART', () => {
    it('should be able to increase the amount of book in cart', () => {
      const id = '333';
      const books = [{
        id: '123',
        amount: 2,
        price: 100,
      }, {
        id: '333',
        amount: 2,
        price: 200,
      }];
      const state = { cart: { item: { books }, subTotal: 1000 } };
      mutations.INCREASE_BOOK_IN_CART(state, id);
      mutations.INCREASE_BOOK_IN_CART(state, id);
      mutations.INCREASE_BOOK_IN_CART(state, '0');

      expect(state.cart.subTotal).toEqual(1400);
      expect(state.cart.item.books[0].amount).toEqual(2);
      expect(state.cart.item.books[1].amount).toEqual(4);
    });
  });

  describe('EDIT_BOOK_CART', () => {});

  describe('CLEAR_CART', () => {
    it('should apply cart default state', () => {
      const state = {};
      mutations.CLEAR_CART(state);

      expect(state.cart).toEqual({
        item: {
          books: [],
        },
        subTotal: 0,
        total: 0,
        discount: {
          books: {
            harry: {},
          },
          amount: 0,
        },
      });
    });
  });

  describe('CALCULATE_DISCOUNT', () => {
    it('should return valid discount base on unique Harry series condition', () => {
      const subTotal = 300;
      const state = {
        cart: {
          discount: {
            books: {
              harry: {
                123: 200,
                444: 100,
              },
            },
          },
          subTotal,
        },
      };

      mutations.CALCULATE_DISCOUNT(state);
      expect(state.cart.total).toBe(subTotal - (subTotal * (HARRY_DISCOUNT[1] / 100)));
      expect(state.cart.discount.amount).toBe(subTotal * (HARRY_DISCOUNT[1] / 100));
    });

    it('should not apply discount if purchase single Harry unique series', () => {
      const subTotal = 300;
      const state = {
        cart: {
          discount: {
            books: {
              harry: {
                123: 200,
              },
            },
          },
          subTotal,
        },
      };

      mutations.CALCULATE_DISCOUNT(state);
      expect(state.cart.total).toBe(subTotal);
      expect(state.cart.discount.amount).toBe(0);
    });

    it('should not apply discount if purchase none Harry series', () => {
      const subTotal = 300;
      const state = {
        cart: {
          discount: {
            books: {},
            amount: 0,
          },
          subTotal,
          total: subTotal,
        },
      };

      mutations.CALCULATE_DISCOUNT(state);
      expect(state.cart.total).toBe(subTotal);
      expect(state.cart.discount.amount).toBe(0);
    });
  });
});
