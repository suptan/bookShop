import mutations from '@/store/modules/products/mutations';

describe('products/mutations', () => {
  it('should contain BOOK_UPDATED handler', () => {
    const state = { books: [] };
    const books = [{ foo: 1 }];
    mutations.BOOKS_UPDATED(state, books);

    expect(state).toEqual(
      expect.objectContaining({
        books: expect.objectContaining(books),
      }),
    );
  });
});
