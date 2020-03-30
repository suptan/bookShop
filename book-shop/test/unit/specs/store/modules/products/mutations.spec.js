import mutations from '@/store/modules/products/mutations';

describe('products/mutations', () => {
  it('should contain BOOK_UPDATED handler', () => {
    const state = { books: [] };
    const books = [{ foo: 1 }];
    mutations.BOOKS_UPDATED(state, books);

    expect(state.books).toEqual(books);
  });
  describe('FILTER_BOOKS', () => {
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
});
