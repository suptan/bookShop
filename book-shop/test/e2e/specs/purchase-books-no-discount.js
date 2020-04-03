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
    payment.expectSaleCompleteDialogWithOutChange();
  },

  'final: redirect back to Landing page': (browser) => {
    const home = browser.page.Home();
    const payment = browser.page.Payment();

    payment.navigateToHome(browser);
    home.expectPageContainerIsPresent();

    browser.end();
  },
};
