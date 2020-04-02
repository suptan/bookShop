const paymentPageCommands = {
  expectSaleCompleteDialogWithOutChange() {
    return this.expect
      .element('@saleComplete')
      .text.to.equal('Sale Complete')
      && this.expect
        .element('@changeAmount')
        .to.be.not.present;
  },
  expectSaleCompleteDialogWithChange(expected = '฿1.00') {
    return this.expect
      .element('@saleComplete')
      .text.to.equal('Sale Complete')
      && this.expect
        .element('@changeAmount')
        .text.to.contain(expected);
  },
  // End expectAssert
  payHundredRoundUp(browser) {
    return browser.execute(() => {
      document.querySelector('[data-qe="pay-hundred-round-up"]').click();
      return true;
    }, [])
      .pause(100);
  },
  payExact(browser) {
    return browser
      .execute(() => {
        document.querySelector('[data-qe="pay-exact"]').click();
        return true;
      }, [])
      .pause(100);
  },
  /**
   * @param {number} amount
   */
  payNow(browser, amount) {
    // this
    //   .setValue(
    //     'xpath',
    //     '//input[@data-qe="input-amount"]',
    //     // '@inputAmount',
    //     amount);

    return browser.execute((inputSelector, payNowSelector, input) => {
      const domInputElement = document.querySelector(inputSelector);
      domInputElement.value = input;
      domInputElement.dispatchEvent(new Event('input'));
      document.querySelector(payNowSelector).click();
      return true;
    }, [
      this.elements.inputAmount.selector,
      this.elements.payNow.selector,
      amount])
      .pause(100);
  },
  navigateToHome(browser) {
    return browser.execute(() => {
      document.getElementsByClassName('dg-btn dg-btn--ok dg-pull-right')[0].click();
      return true;
    }, []).pause(200);
  },
};

module.exports = {
  commands: [paymentPageCommands],
  url() {
    return `${this.api.launchUrl}/payment`;
  },
  elements: {
    saleComplete: {
      selector: '//div[@data-qe="sale-complete"]/b',
      locateStrategy: 'xpath',
    },
    changeAmount: {
      selector: '//div[@data-qe="change-amount"]',
      locateStrategy: 'xpath',
    },
    inputAmount: {
      selector: '[data-qe="input-amount"]',
      //   selector: '//input[@data-qe="input-amount"]',
      locateStrategy: 'xpath',
    },
    payNow: {
      selector: '[data-qe="pay-now"]',
      locateStrategy: 'className',

    },
  },
};
