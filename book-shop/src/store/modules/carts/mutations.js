/**
 *
 * @param {import(".").CartState} state
 * @param {import("../products").Book} book
 */
const ADD_TO_CART = (state, book) => {
  const index = state.cart.item.books.map(b => b.id).indexOf(book.id);
  const price = +book.price;
  const item = index > -1 ? state.cart.item.books[index] : book;

  item.amount = item.amount + 1 || 1;
  item.total = item.total + price || price;

  if (index === -1) {
    state.cart.item.books.push(item);
  } else {
    state.cart.item.books[index] = item;
  }

  state.cart.total += price;
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
