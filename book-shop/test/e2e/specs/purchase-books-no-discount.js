// const expect = require('chai').expect;

module.exports = {
  'step one: navigate to book shop': (browser) => {
    const devServer = browser.globals.devServerURL;

    browser
      .url(devServer)
      .waitForElementVisible('#app', 5000)
      .waitForElementVisible('.ProductListItem', 30000);
  },

  'step two: add books into the cart': (browser) => {
    browser
      .useXpath()
      .waitForElementVisible(
        '//span[@data-qe="book-title" and text()="Harry Potter and the Goblet of Fire (IV)"]',
        1000,
      );
    browser
      .execute(() => {
        const books = [
          'Harry Potter and the Goblet of Fire (IV)',
          'Enlightenment Now',
          'Elastic'];
        document.querySelectorAll('[data-qe="book-title"]').forEach((element) => {
          if (books.includes(element.innerText)) {
            element.click();

            if (element.innerText === books[0]) {
              element.click();
            }
          }
        });
        return true;
      }, []);
    // .click() not trigger on MacBook
    // browser
    //   .click('//span[@data-qe="book-title" and text()="Harry Potter and the Goblet of Fire (IV)"]/../..')
    //   .pause(200);
    browser.expect.element('//div[@data-qe="cart-discount"]/span').text
      .to.equal('฿0.00');
    browser.expect.element('//div[@data-qe="cart-sub-total"]/span').text
      .to.equal('฿1,190.00');
  },

  'step three: navigate to payment page': (browser) => {
    browser
      .execute(() => {
        document.querySelector('[data-qe="to-payment"]').click();
        return true;
      }, []);
  },

  'step four: pay with Exact amount': (browser) => {
    browser
      .execute(() => {
        document.querySelector('[data-qe="pay-exact"]').click();
        return true;
      }, []);
    browser.expect.element('//div[@data-qe="sale-complete"]/b').text
      .to.equal('Sale Complete');
  },

  'final: redirect back to Landing page': (browser) => {
    browser
      .execute(() => {
        document.getElementsByClassName('dg-btn dg-btn--ok dg-pull-right')[0].click();
        return true;
      }, []);
    // eslint-disable-next-line no-unused-expressions
    browser.expect.element('//div[@class="HomeView"]').to.be.present;

    browser.end();
  },
};
