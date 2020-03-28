import logger from '../utils/logger';

/**
 * @return {Promise<import('../store/modules/products').Book[]>}
 */
const fetchBooks = () => {
  logger.debug('Start fetch books info.');
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          cover: 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/4088/9781408855652.jpg',
          price: '350',
          title: "Harry Potter and the Philosopher's Stone (I)",
          id: '9781408855652',
        },
        {
          cover: 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/4088/9781408855669.jpg',
          price: '350',
          title: 'Harry Potter and the Chamber of Secrets (II)',
          id: '9781408855669',
        },
      ]);
    }, 500);
  });
};

export {
  fetchBooks,
};
