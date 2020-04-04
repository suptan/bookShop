// const expect = require('chai').expect;

module.exports = {
  'step one: navigate to book shop': (browser) => {
    const home = browser.page.Home();

    home.navigate()
      .waitForMainElement();
  },

  'step two: add books into the cart': (browser) => {
    const home = browser.page.Home();
    home.pickDuplicateHarryWithMixTwoBooks(browser);

    home.expectDiscountIsCorrect();
    home.expectSubTotalIsCorrect('฿1,190.00');
    home.expectTotalIsCorrect('฿1,190.00');
    // .click() not trigger on MacBook
    // browser
    //   .click('//span[@data-qe="book-title" and text()="Harry Potter and the Goblet of Fire (IV)"]/../..')
    //   .pause(200);
  },

  'step three: navigate to payment page': (browser) => {
    const home = browser.page.Home();
    home.navigateToPayment(browser);
  },

  'step four: pay with Exact amount': (browser) => {
    const payment = browser.page.Payment();

    payment.payExact(browser);
    payment.expectChangeIsCorrect();
    payment.payNow(browser);
    payment.expectSaleCompleteDialogWithOutChange();
  },

  'step five: confirm payment and redirect to cash receipt': (browser) => {
    const payment = browser.page.Payment();
    payment.navigateToThankYou(browser);
  },

  'step six: validate sub total, discount, total, cash, and change': (browser) => {
    const thankyou = browser.page.ThankYou();

    thankyou.expectPageContainerIsPresent();
    thankyou.expectSubTotalIsCorrect('฿1,190.00');
    thankyou.expectDiscountIsCorrect('฿0.00');
    thankyou.expectTotalIsCorrect('฿1,190.00');
    thankyou.expectCashIsCorrect('฿1,190.00');
    thankyou.expectChangeIsCorrect('฿0.00');
    thankyou.navigateToHome(browser);
  },

  'final: redirect back to Landing page': (browser) => {
    const home = browser.page.Home();

    home.expectPageContainerIsPresent();

    browser.end();
  },
};
