module.exports = {
  'step one: navigate to book shop': (browser) => {
    const home = browser.page.Home();
    home.navigate()
      .waitForMainElement();
  },

  'step two: pick all available books': (browser) => {
    const home = browser.page.Home();
    home.pickAllBooksEachOfThem(browser);
  },

  'step three: discount and price display correctly': (browser) => {
    const home = browser.page.Home();
    home.expectDiscountIsCorrect('฿384.00');
    home.expectSubTotalIsCorrect('฿8,160.00');
    home.expectTotalIsCorrect('฿7,776.00');
  },

  'step four: process checkout': (browser) => {
    const home = browser.page.Home();
    home.navigateToPayment(browser);
  },

  'step five: paid with exceed amount': (browser) => {
    const payment = browser.page.Payment();

    payment.payNow(browser, 23401);

    payment.expectSaleCompleteDialogWithChange('฿15,625.00');
  },

  'final: confirm change and redirect back to home': (browser) => {
    const home = browser.page.Home();
    const payment = browser.page.Payment();

    payment.navigateToHome(browser);
    home.expectPageContainerIsPresent();

    browser.end();
  },
};
