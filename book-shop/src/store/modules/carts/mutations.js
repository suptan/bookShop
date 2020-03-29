import Vue from 'vue';
import { HARRY_DISCOUNT } from '@/utils/constant';

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
    if (book.title.includes('Harry Potter')) {
      state.cart.discount.books.harry.add(book.id);
    }
  } else {
    Vue.set(state.cart.item.books, index, item);
  }

  state.cart.subTotal += price;
};

/**
 *
 * @param {import(".").CartState} state
 * @param {number} id
 */
const REMOVE_FROM_CART = (state, id) => {
  const index = state.cart.item.books.map(b => b.id).indexOf(id);

  if (index < 0) return;

  const removeItem = state.cart.item.books.splice(index, 1)[0];
  state.cart.discount.books.harry.delete(removeItem.id);

  state.cart.subTotal -= removeItem.total;
};

/**
 *
 * @param {import(".").CartState} state
 * @param {number} id
 */
const DECREASE_BOOK_IN_CART = (state, id) => {
  const index = state.cart.item.books.map(b => b.id).indexOf(id);
  const book = state.cart.item.books[index];

  if (!book || book.amount < 1) return;

  book.amount -= 1;
  book.total -= +book.price;
  Vue.set(state.cart.item.books, index, book);
  state.cart.subTotal -= +book.price;
};

/**
 *
 * @param {import(".").CartState} state
 * @param {number} id
 */
const INCREASE_BOOK_IN_CART = (state, id) => {
  const index = state.cart.item.books.map(b => b.id).indexOf(id);
  const book = state.cart.item.books[index];

  if (!book) return;

  book.amount += 1;
  book.total += +book.price;
  Vue.set(state.cart.item.books, index, book);
  state.cart.subTotal += +book.price;
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

/**
 *
 * @param {import('.').Cart} state.cart
 */
const CALCULATE_DISCOUNT = (state) => {
  const {
    subTotal,
    discount: { books: { harry } },
  } = state.cart;
  const discountAmount = subTotal * (HARRY_DISCOUNT[harry.size - 1] / 100);
  const total = subTotal - discountAmount;

  state.cart.total = total;
  state.cart.discount.amount = discountAmount;
};

export default {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  DECREASE_BOOK_IN_CART,
  INCREASE_BOOK_IN_CART,
  EDIT_BOOK_CART,
  CLEAR_CART,
  CALCULATE_DISCOUNT,
};
