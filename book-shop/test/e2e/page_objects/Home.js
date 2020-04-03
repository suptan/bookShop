/**
 * @typedef {Object} HomePageCommands
 * @property {function():any} waitForMainElement
 */
const homePageCommands = {
  // expectAssert
  assertTitleIsCorrect(expected = 'Little Brown Book') {
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
    return browser.execute((selector) => {
      const books = [
        "Harry Potter and the Philosopher's Stone (I)",
        'Harry Potter and the Chamber of Secrets (II)',
        'The Confidence Project'];
      document.querySelectorAll(selector).forEach((element) => {
        if (books.includes(element.innerText)) {
          element.click();

          // Discount will not apply for duplicate book
          if (element.innerText === books[0]) {
            element.click();
          }
        }
      });
      return true;
    }, [this.elements.bookTitle.selector])
      .pause(100);
  },
  pickDuplicateHarryWithMixTwoBooks(browser) {
    return browser
      .execute((selector) => {
        const books = [
          'Harry Potter and the Goblet of Fire (IV)',
          'Enlightenment Now',
          'Elastic'];
        document.querySelectorAll(selector).forEach((element) => {
          if (books.includes(element.innerText)) {
            element.click();

            if (element.innerText === books[0]) {
              element.click();
            }
          }
        });
        return true;
      }, [this.elements.bookTitle.selector])
      .pause(100);
  },
  pickAllBooksEachOfThem(browser) {
    return browser
      .execute((selector) => {
        document.querySelectorAll(selector).forEach((element) => {
          element.click();
        });
        return true;
      }, [this.elements.bookTitle.selector])
      .pause(100);
  },
  pickByTitle(browser, title) {
    return browser
      .execute((selector, input) => {
        const domBooks = document.querySelectorAll(selector);
        for (let i = 0; i < domBooks.length; i += 1) {
          if (domBooks[i].textContent.replace(/\s/g, '') === input) {
            domBooks[i].click();
            break;
          }
        }

        return true;
      }, [
        this.elements.bookTitle.selector,
        title.replace(/\s/g, ''),
      ]);
  },
  increaseBookAmount(browser, title, amount) {
    return browser
      .execute((titleSelector, input, times) => {
        const domBooks = document.querySelectorAll(titleSelector);
        for (let i = 0; i < domBooks.length; i += 1) {
          if (domBooks[i].textContent.replace(/\s/g, '') === input) {
            const bookId = domBooks[i].attributes['data-item-id'].value;
            const domIncrease = document.querySelector(`[data-qe="plus-amount-${bookId}"]`);
            for (let j = 0; j < times; j += 1) {
              domIncrease.click();
            }
            break;
          }
        }
        return true;
      }, [
        this.elements.bookTitle.selector,
        title.replace(/\s/g, ''),
        amount,
      ]);
  },
  decreaseBookAmount(browser, title, amount) {
    return browser
      .execute((titleSelector, input, times) => {
        const domBooks = document.querySelectorAll(titleSelector);
        for (let i = 0; i < domBooks.length; i += 1) {
          if (domBooks[i].textContent.replace(/\s/g, '') === input) {
            const bookId = domBooks[i].attributes['data-item-id'].value;
            const domDecrease = document.querySelector(`[data-qe="minus-amount-${bookId}"]`);
            for (let j = 0; j < times; j += 1) {
              domDecrease.click();
            }
            break;
          }
        }
        return true;
      }, [
        this.elements.bookTitle.selector,
        title.replace(/\s/g, ''),
        amount,
      ]);
  },
  navigateToPayment(browser) {
    return browser
      .execute(() => {
        document.querySelector('[data-qe="to-payment"]').click();
        return true;
      }, []).pause(200);
  },
};

/**
 * @typedef {Object} HomePageObject
 * @property {HomePageCommands[]} commands
 */
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
    bookTitle: {
      selector: '[data-qe="book-title"]',
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
    searchBox: {
      selector: '[data-qe="search-book"]',
    },
  },
};
