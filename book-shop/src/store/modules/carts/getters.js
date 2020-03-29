/**
 *
 * @param {import(".").CartState} state
 */
const cart = state => state.cart;
/**
 *
 * @param {import(".").CartState} state
 */
const item = state => state.cart.item;

export default {
  cart,
  item,
};
