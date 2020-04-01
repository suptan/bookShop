import getters from '@/store/modules/products/getters';

describe('products/getters', () => {
  describe('books()', () => {
    it('should return expected property', () => {
      const input = { books: { foo: 1 } };
      const result = getters.books(input);

      expect(result).toEqual(
        expect.objectContaining({
          foo: expect.anything(),
        }),
      );
    });
  });

  describe('displayBooks()', () => {
    it('should return expected property', () => {
      const input = { displayBooks: { foo: 1 } };
      const result = getters.displayBooks(input);

      expect(result).toEqual(
        expect.objectContaining({
          foo: expect.anything(),
        }),
      );
    });
  });

  describe('isFetchBooks()', () => {
    it('should return expected property', () => {
      const input = { isFetchBooks: true };
      const result = getters.isFetchBooks(input);

      expect(result).toEqual(true);
    });
  });
});
