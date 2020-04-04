const paymentPageCommands = {
  expectSaleCompleteDialogWithOutChange() {
    return this.expect
      .element('@saleComplete')
      .text.to.equal('Sale Complete');
  },
  expectSaleIncompleteDialog() {
    return this.expect.element('@payFailed')
      .text.to.equal('Amount not enough');
  },
  expectChangeIsCorrect(expected = '฿0.00') {
    return this.expect
      .element('@changeAmount')
      .text.to.equal(expected);
  },
  // End expectAssert
  payHundredRoundUp(browser) {
    return browser.execute((selector) => {
      document.querySelector(selector).click();
      return true;
    }, [this.elements.payHundredRoundUp.selector])
      .pause(100);
  },
  payExact(browser) {
    return browser
      .execute((selector) => {
        document.querySelector(selector).click();
        return true;
      }, [this.elements.payExact.selector])
      .pause(100);
  },
  /**
   * @param {number} amount
   */
  payNow(browser) {
    // this
    //   .setValue(
    //     'xpath',
    //     '//input[@data-qe="input-amount"]',
    //     // '@inputAmount',
    //     amount);

    return browser.execute((payNowSelector) => {
      document.querySelector(payNowSelector).click();
      return true;
    }, [this.elements.payNow.selector])
      .pause(100);
  },
  inputAmount(browser, amount) {
    return browser.execute((inputSelector, input) => {
      if (input != null) {
        const domInputElement = document.querySelector(inputSelector);
        domInputElement.value = input;
        domInputElement.dispatchEvent(new Event('input'));
      }
      return true;
    }, [
      this.elements.inputAmount.selector,
      amount])
      .pause(100);
  },
  closeSaleIncompleteDialog(browser) {
    return browser.execute((selector) => {
      document.getElementsByClassName(selector)[0].click();
      return true;
    }, [this.elements.confirmBtn.selector]).pause(200);
  },
  navigateToThankYou(browser) {
    return browser.execute((selector) => {
      document.getElementsByClassName(selector)[0].click();
      return true;
    }, [this.elements.confirmBtn.selector]).pause(500);
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
    payFailed: {
      selector: '//div[@data-qe="not-enough-money"]',
      locateStrategy: 'xpath',
    },
    payHundredRoundUp: {
      selector: '[data-qe="pay-hundred-round-up"]',
    },
    payExact: {
      selector: '[data-qe="pay-exact"]',
    },
    payNow: {
      selector: '[data-qe="pay-now"]',
      locateStrategy: 'querySelector',
    },
    confirmBtn: {
      selector: 'dg-btn dg-btn--ok dg-pull-right',
      locateStrategy: 'class',
    },
  },
};
