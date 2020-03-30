const mockItem = {
  books: [{
    cover: 'pic1',
    price: 111,
    title: 'foo',
    id: '330',
    amount: 3,
  }, {
    cover: 'pic2',
    price: 123,
    title: 'bar',
    id: '431',
    amount: 2,
  }, {
    cover: 'pic3',
    price: 123,
    title: 'bar',
    id: '500',
    amount: 1,
  }],
};

const mockCarts = {
  item: mockItem,
  subTotal: 500,
  total: 400,
  discount: {
    books: {
      harry: {},
    },
    amount: 100,
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
  mockItem,
  mockCarts,
  mockCartsState,
};
