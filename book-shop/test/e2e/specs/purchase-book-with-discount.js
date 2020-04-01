module.exports = {
  'step one: navigate to book shop': (browser) => {
    const home = browser.page.Home();

    home.navigate()
      .waitForMainElement()
      .assertTitleIsCorrect();
    //   .saveScreenshot('home.png');

    home.expectSubTotalIsCorrect();
    home.expectDiscountIsCorrect();
  },

  'step two: pick 4 books with 2 unique Harry Potter series': (browser) => {
    const home = browser.page.Home();
    home.pickHarryWithMixFourBooks(browser);
  },

  'step three: discount had been apply correctly': (browser) => {
    const home = browser.page.Home();
    home.expectSubTotalIsCorrect('฿1,395.00');
    home.expectDiscountIsCorrect('฿70.00');
    home.expectTotalIsCorrect('฿1,325.00');
  },

  'step four: process checkout': (browser) => {
    const home = browser.page.Home();
    home.navigateToPayment(browser);
  },

  'step five: paid with round up 2 digits': (browser) => {
    const payment = browser.page.Payment();

    payment.payHundredRoundUp(browser);

    payment.expectSaleCompleteDialogWithChange();
  },

  'final: confirm change and redirect back to home': (browser) => {
    const home = browser.page.Home();
    const payment = browser.page.Payment();

    payment.navigateToHome(browser);
    home.expectPageContainerIsPresent();

    browser.end();
  },
};
