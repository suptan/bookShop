import { ENABLED_PROXY, PROXY_URL } from '../config';

// import axios from 'axios';
/**
 *
 * @param {string} url
 * @returns {string}
 */
function generateUrl(url) {
  const proxyUrl = PROXY_URL;
  return ENABLED_PROXY === 'ON' ? proxyUrl + url : url;
}

/**
 * @param {Object} param0
 * @param {string} param0.path
 */
async function getRequest(url) {
  return new Promise((resolve, reject) => {
    // axios.get(url, {
    //   mode: 'no-cors',
    // })
    //   .then((res) => {
    //     console.log(res);
    //     return resolve(res);
    //   })
    //   .catch(error => reject(new Error(`GET ${url} ${error.message}`)));
    // proxyUrl +
    fetch(generateUrl(url), {
      // mode: 'no-cors',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        console.log(res);
        if (res.ok) {
          return res.json();
        }
        return reject({ status: res.status });
      })
      .then((json) => {
        console.log(json);
        return resolve(json);
      })
      .catch(error => reject(new Error(`GET ${url} ${error.message}`)));
    // setTimeout(() => {
    //   resolve([
    //     {
    //       cover: 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/4088/9781408855652.jpg',
    //       price: +'350',
    //       title: "Harry Potter and the Philosopher's Stone (I)",
    //       id: '9781408855652',
    //     },
    //     {
    //       cover: 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/4088/9781408855690.jpg',
    //       price: +'380',
    //       title: 'Harry Potter and the Order of the Phoenix (V)',
    //       id: '9781408855690',
    //     },
    //     {
    //       cover: 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/4088/9781408855690.jpg',
    //       price: +'380',
    //       title: 'Harry Potter and the Order of the Phoenix (V)',
    //       id: '9781408855690',
    //     },
    //     {
    //       cover: 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/4088/9781408855690.jpg',
    //       price: +'380',
    //       title: 'Harry Potter and the Order of the Phoenix (V)',
    //       id: '9781408855690',
    //     },
    //     {
    //       cover: 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/4088/9781408855690.jpg',
    //       price: +'380',
    //       title: 'Harry Potter and the Order of the Phoenix (V)',
    //       id: '9781408855690',
    //     },
    //     {
    //       cover: 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/5098/9781509809950.jpg',
    //       price: +'160',
    //       title: 'Solve For Happy',
    //       id: '9781509809950',
    //     },
    //     {
    //       cover: 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/4736/9781473634176.jpg',
    //       price: +'345',
    //       title: 'The Confidence Project',
    //       id: '9781473634176',
    //     },
    //   ]);
    // }, 500);
  });
}


export {
  getRequest,
};
