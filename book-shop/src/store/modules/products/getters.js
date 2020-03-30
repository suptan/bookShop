/**
 *
 * @param {import(".").BooksState} state
 * @returns {import(".").Book[]}
 */
const books = state => state.books;

/**
 *
 * @param {import(".").BooksState} state
 * @returns {import(".").Book[]}
 */
const displayBooks = state => state.displayBooks;

/**
 *
 * @param {import(".").BooksState} state
 * @returns {boolean}
 */
const isFetchBooks = state => state.isFetchBooks;

export default {
  books,
  displayBooks,
  isFetchBooks,
};
