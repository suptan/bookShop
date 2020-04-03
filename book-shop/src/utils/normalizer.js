/**
 * Convert given number to string Thai Baht currency format
 * @param {number} money
 * @returns {string}
 */
function THBCurrency(money = 0) {
  const amount = typeof money === 'undefined' ? 0 : money;
  return new Intl.NumberFormat('th-th', { currency: 'THB', style: 'currency' }).format(amount);
}

export default {
  THBCurrency,
};
