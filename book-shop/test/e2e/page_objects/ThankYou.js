const paymentPageCommands = {
  expectPageContainerIsPresent() {
    return this.waitForElementVisible('.ThankYouView', 3000);
  },
  expectDiscountIsCorrect(expected = '฿0.00') {
    return this.expect
      .element('@discount')
      .text.to.equal(expected);
  },
  expectSubTotalIsCorrect(expected = '฿0.00') {
    return this.expect
      .element('@subTotal')
      .text.to.equal(expected);
  },
  expectTotalIsCorrect(expected = '฿0.00') {
    return this.expect
      .element('@total')
      .text.to.equal(expected);
  },
  expectCashIsCorrect(expected = '฿0.00') {
    return this.expect
      .element('@cash')
      .text.to.equal(expected);
  },
  expectChangeIsCorrect(expected = '฿0.00') {
    return this.expect
      .element('@change')
      .text.to.equal(expected);
  },
};

module.exports = {
  commands: [paymentPageCommands],
  url() {
    return `${this.api.launchUrl}/payment`;
  },
  elements: {
    view: {
      selector: "//div[class='ThankYouView']",
      locateStrategy: 'xpath',
    },
    discount: {
      selector: '//div[@data-qe="discount-amount"]/div[2]',
      locateStrategy: 'xpath',
    },
    subTotal: {
      selector: '//div[@data-qe="sub-total-amount"]/div[2]',
      locateStrategy: 'xpath',
    },
    total: {
      selector: '//div[@data-qe="total-amount"]/div[2]',
      locateStrategy: 'xpath',
    },
    cash: {
      selector: '//div[@data-qe="cash-amount"]/div[2]',
      locateStrategy: 'xpath',
    },
    change: {
      selector: '//div[@data-qe="change-amount"]/div[2]',
      locateStrategy: 'xpath',
    },
  },
};
