/**
 *
 * @param {import(".").BooksState} state
 * @param {import(".").Book[]} books
 */
const BOOKS_UPDATED = (state, books) => {
  state.books = books;
};

export default {
  BOOKS_UPDATED,
};
