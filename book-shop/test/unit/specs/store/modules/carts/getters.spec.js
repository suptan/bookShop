import getters from '@/store/modules/carts/getters';

describe('carts/getters', () => {
  describe('cart', () => {
    it('should return expected property', () => {
      const input = { cart: 1 };
      const result = getters.cart(input);

      expect(result).toBe(input.cart);
    });
  });
  describe('item', () => {
    it('should return expected property', () => {
      const input = { cart: { item: [] } };
      const result = getters.item(input);

      expect(result).toBe(input.cart.item);
    });
  });
});
