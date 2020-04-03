import cartsModule from '@/store/modules/carts';

describe('carts', () => {
  it('should contain default state of module', () => {
    expect(cartsModule.state).toEqual(
      {
        cart: {
          item: {
            books: [],
          },
          subTotal: 0,
          total: 0,
          cash: 0,
          change: 0,
          discount: {
            books: {
              harry: {},
            },
            amount: 0,
          },
        },
      },
    );
  });

  it('should contain madatory properties', () => {
    expect(cartsModule).toEqual({
      namespaced: true,
      state: expect.any(Object),
      actions: expect.any(Object),
      getters: expect.any(Object),
      mutations: expect.any(Object),
    });
  });
});
