/**
 *
 * @param {import(".").BooksState} state
 * @param {import(".").Book[]} books
 */
const BOOKS_UPDATED = (state, books) => {
  state.books = books;
};

/**
 *
 * @param {import(".").BooksState} state
 * @param {import(".").Book[]} books
 */
const FILTER_BOOKS = (state, title) => {
  if (!title || title.length === 0) {
    state.displayBooks = state.books;
    return;
  }
  const compare = title.toLowerCase();
  const displayBooks = state.books.filter(book => book.title.toLowerCase().includes(compare));
  state.displayBooks = displayBooks;
};

/**
 *
 * @param {import(".").BooksState} state
 * @param {boolean} flag
 */
const SET_IS_FETCH_BOOK = (state, flag) => {
  state.isFetchBooks = flag;
};

export default {
  BOOKS_UPDATED,
  FILTER_BOOKS,
  SET_IS_FETCH_BOOK,
};
