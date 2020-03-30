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

export default {
  books,
  displayBooks,
};
