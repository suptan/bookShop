const paymentPageCommands = {
  expectSaleCompleteDialogWithChange() {
    return this.expect
      .element('@saleComplete')
      .text.to.equal('Sale Complete')
      && this.expect
        .element('@changeAmount')
        .text.to.contain('฿75.00');
  },
  // End expectAssert
  payHundredRoundUp(browser) {
    return browser.execute(() => {
      document.querySelector('[data-qe="pay-hundred-round-up"]').click();
      return true;
    }, []);
  },
  navigateToHome(browser) {
    return browser.execute(() => {
      document.getElementsByClassName('dg-btn dg-btn--ok dg-pull-right')[0].click();
      return true;
    }, []);
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
  },
};
