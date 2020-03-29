/**
 *
 * @param {number} money
 */
function THBCurrency(money = 0) {
  return new Intl.NumberFormat('th-th', { currency: 'THB', style: 'currency' }).format(money);
}

export default {
  THBCurrency,
};
