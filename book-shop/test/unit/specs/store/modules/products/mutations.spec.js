import mutations from '@/store/modules/products/mutations';

describe('products/mutations', () => {
  describe('BOOK_UPDATED()', () => {
    it('should set state of books from the given data', () => {
      const state = { books: [] };
      const books = [{ foo: 1 }];
      mutations.BOOKS_UPDATED(state, books);

      expect(state.books).toEqual(books);
    });
  });

  describe('FILTER_BOOKS()', () => {
    it('should not change anything when not send filter', () => {
      const books = [{ foo: 1 }, { bar: 2 }];
      const state = { books };
      mutations.FILTER_BOOKS(state);

      expect(state.displayBooks).toEqual(books);
    });
    it('should filter books by given title', () => {
      const books = [{ title: 'haary' }, { title: 'hary' }, { title: 'hary 3' }];
      const state = { books };
      mutations.FILTER_BOOKS(state, 'hary');

      expect(state.displayBooks).toEqual([
        { title: 'hary' }, { title: 'hary 3' },
      ]);
    });
  });

  describe('BOOK_UPDATED()', () => {
    it('should set state of isFetchBooks to true', () => {
      const state = { isFetchBooks: false };
      const flag = true;
      mutations.SET_IS_FETCH_BOOK(state, flag);

      expect(state.isFetchBooks).toEqual(flag);
    });

    it('should set state of isFetchBooks to false', () => {
      const state = { isFetchBooks: true };
      const flag = false;
      mutations.SET_IS_FETCH_BOOK(state, flag);

      expect(state.isFetchBooks).toEqual(flag);
    });
  });
});
