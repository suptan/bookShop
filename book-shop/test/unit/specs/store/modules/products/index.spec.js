import productsModule from '@/store/modules/products';

describe('products', () => {
  it('should contain default state of module', () => {
    expect(productsModule).toEqual(
      expect.objectContaining({
        namespaced: true,
        state: { books: [], displayBooks: [], isFetchBooks: false },

      }),
    );
  });
});
