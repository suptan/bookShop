/**
 *
 * @param {import(".").CartState} state
 * @param {import("../products").Book} book
 */
const ADD_TO_CART = (state, book) => {
  state.cart.item.books.push(book);
  state.cart.total += +book.price;
};

/**
 *
 * @param {import(".").CartState} state
 * @param {import("../products").Book} book
 */
const EDIT_BOOK_CART = (state, book) => {
  const { books } = state;
  const index = books.indexOf(book);

  if (index > -1) {
    books[index] = book;
  }
};

/**
 *
 * @param {import(".").CartState} state
 */
const CLEAR_CART = (state) => {
  state.cart = {
    item: {
      books: [],
    },
    total: 0,
  };
};

export default {
  ADD_TO_CART,
  EDIT_BOOK_CART,
  CLEAR_CART,
};
