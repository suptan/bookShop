const homePageCommands = {
  // expectAssert
  assertTitleIsCorrect(expected = 'book-shop') {
    return this.assert.title(expected);
  },
  waitForMainElement() {
    return this.waitForElementVisible('#app', 5000)
      .waitForElementVisible('.ProductListItem', 30000);
  },
  expectSubTotalIsCorrect(expected = '฿0.00') {
    return this.expect
      .element('@cartSubTotal')
      .text.to.equal(expected);
  },
  expectDiscountIsCorrect(expected = '฿0.00') {
    return this.expect
      .element('@cartDiscount')
      .text.to.equal(expected);
  },
  expectTotalIsCorrect(expected = '฿0.00') {
    return this.expect
      .element('@cartTotal')
      .text.to.contain(expected);
  },
  expectPageContainerIsPresent() {
    return this.expect.element('@main').to.be.present;
  },
  // End expectAssert
  pickHarryWithMixFourBooks(browser) {
    return browser.execute(() => {
      const books = [
        "Harry Potter and the Philosopher's Stone (I)",
        'Harry Potter and the Chamber of Secrets (II)',
        'The Confidence Project'];
      document.querySelectorAll('[data-qe="book-title"]').forEach((element) => {
        if (books.includes(element.innerText)) {
          element.click();

          // Discount will not apply for duplicate book
          if (element.innerText === books[0]) {
            element.click();
          }
        }
      });
      return true;
    }, []);
  },
  navigateToPayment(browser) {
    return browser
      .execute(() => {
        document.querySelector('[data-qe="to-payment"]').click();
        return true;
      }, []);
  },
};

module.exports = {
  commands: [homePageCommands],
  url() {
    return this.api.launchUrl;
  },
  elements: {
    main: {
      selector: '//div[@class="HomeView"]',
      locateStrategy: 'xpath',
    },
    harryIV: {
      selector: '//span[@data-qe="book-title" and text()="Harry Potter and the Goblet of Fire (IV)"]',
      locateStrategy: 'xpath',
    },
    cartDiscount: {
      selector: '//div[@data-qe="cart-discount"]/span',
      locateStrategy: 'xpath',
    },
    cartSubTotal: {
      selector: '//div[@data-qe="cart-sub-total"]/span',
      locateStrategy: 'xpath',
    },
    cartTotal: {
      selector: '//div[@data-qe="to-payment"]',
      locateStrategy: 'xpath',
    },
  },
};
