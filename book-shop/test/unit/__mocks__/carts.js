const mockItem = {
  books: [],
};

const mockCarts = {
  item: mockItem,
  subTotal: 0,
  total: 0,
  discount: {
    books: {
      harry: new Set(),
    },
    amount: 0,
  },
};

const mockCartsState = {
  namespaced: true,
  state: { cart: mockCarts },
  actions: {
    addBookToCart: jest.fn(),
    removeBookFromCart: jest.fn(),
    decreaseBookInCart: jest.fn(),
    increaseBookInCart: jest.fn(),
    clearCart: jest.fn(),
  },
  getters: {
    cart: () => mockCarts,
    item: () => mockItem,
  },
  mutations: {
    ADD_TO_CART: jest.fn(),
    REMOVE_FROM_CART: jest.fn(),
    DECREASE_BOOK_IN_CART: jest.fn(),
    INCREASE_BOOK_IN_CART: jest.fn(),
    EDIT_BOOK_CART: jest.fn(),
    CLEAR_CART: jest.fn(),
    CALCULATE_DISCOUNT: jest.fn(),
  },
};

export {
  mockCartsState,
};
