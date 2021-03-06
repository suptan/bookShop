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
    payment.inputAmount(browser, 23401);
    payment.expectChangeIsCorrect('฿15,625.00');
    payment.payNow(browser);
    payment.expectSaleCompleteDialogWithOutChange();
  },

  'step six: confirm payment and redirect to cash receipt': (browser) => {
    const payment = browser.page.Payment();
    payment.navigateToThankYou(browser);
  },

  'step seven: validate sub total, discount, total, cash, and change': (browser) => {
    const thankyou = browser.page.ThankYou();

    thankyou.expectPageContainerIsPresent();
    thankyou.expectSubTotalIsCorrect('฿8,160.00');
    thankyou.expectDiscountIsCorrect('฿384.00');
    thankyou.expectTotalIsCorrect('฿7,776.00');
    thankyou.expectCashIsCorrect('฿23,401.00');
    thankyou.expectChangeIsCorrect('฿15,625.00');
    thankyou.navigateToHome(browser);
  },

  'final: confirm change and redirect back to home': (browser) => {
    const home = browser.page.Home();

    home.expectPageContainerIsPresent();

    browser.end();
  },
};
