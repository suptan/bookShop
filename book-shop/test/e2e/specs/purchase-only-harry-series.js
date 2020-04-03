module.exports = {
  'step one: navigate to book shop': (browser) => {
    const home = browser.page.Home();

    home.navigate()
      .waitForMainElement();


    home.navigateToPayment(browser);
  },

  'step two: pick only Harry Potter series': (browser) => {
    const home = browser.page.Home();

    const series = [
      "Harry Potter and the Philosopher's Stone(I)",
      'Harry Potter and the Chamber of Secrets (II)',
      'Harry Potter and the Prisoner of Azkaban (III)',
      'Harry Potter and the Goblet of Fire (IV)',
      'Harry Potter and the Order of the Phoenix (V)',
      'Harry Potter and the Half-Blood Prince (VI)',
      'Harry Potter and the Deathly Hallows (VII)',
    ];

      // eslint-disable-next-line array-callback-return
    series.map((title) => {
      home.pickByTitle(browser, title);
      home.increaseBookAmount(browser, title, 9);
    });
  },

  'step three: discount and price display correctly': (browser) => {
    const home = browser.page.Home();
    home.expectDiscountIsCorrect('฿384.00');
    home.expectSubTotalIsCorrect('฿25,600.00');
    home.expectTotalIsCorrect('฿25,216.00');
  },

  'step four: add random book to cart but decrease amount less than 0': (browser) => {
    const home = browser.page.Home();
    home.pickByTitle(browser, 'The Rosie Result');
    home.decreaseBookAmount(browser, 'The Rosie Result', 5);
  },

  'step five: discount and price display correctly': (browser) => {
    const home = browser.page.Home();
    home.expectDiscountIsCorrect('฿384.00');
    home.expectSubTotalIsCorrect('฿25,600.00');
    home.expectTotalIsCorrect('฿25,216.00');
  },

  'step six: process checkout': (browser) => {
    const home = browser.page.Home();
    home.navigateToPayment(browser);
  },

  'step seven: paid less than total': (browser) => {
    const payment = browser.page.Payment();
    payment.payNow(browser, 23401);
    payment.expectSaleIncompleteDialog();
    payment.closeSaleIncompleteDialog(browser);
  },

  'step eight: paid over than total': (browser) => {
    const payment = browser.page.Payment();
    payment.payNow(browser, 26401);
    payment.expectSaleCompleteDialogWithChange('฿1,185.00');
  },

  'final: confirm change and redirect back to home': (browser) => {
    const home = browser.page.Home();
    const payment = browser.page.Payment();

    payment.navigateToHome(browser);
    home.expectPageContainerIsPresent();

    browser.end();
  },
};
