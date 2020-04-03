const mockAction = { getBooks: jest.fn() };

const mockBooks = [{
  cover: 'pic1',
  price: 111,
  title: 'foo',
  id: '330',
}, {
  cover: 'pic2',
  price: 123,
  title: 'bar',
  id: '431',
}];

const mockProducts = {
  namespaced: true,
  state: { books: mockBooks },
  actions: mockAction,
  getters: { books: () => mockBooks },
  mutations: {
    BOOKS_UPDATED: jest.fn(() => mockBooks),
  },
};

export {
  mockAction,
  mockBooks,
  mockProducts,
};
