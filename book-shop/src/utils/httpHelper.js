// import axios from 'axios';

/**
 * @param {Object} param0
 * @param {string} version
 * @param {string} path
 * @param {string} id
 * @param {string} queryString
 */
function generateUrl({
  version, path, id, queryString,
}) {
  let url = 'https://json-bin.netlify.com';
  url += version ? `/${version}` : '';
  url += path ? `/${path}` : '';
  url += id ? `/${id}` : '';
  url += queryString ? `?${queryString}` : '';
  return url;
}

/**
 * @param {Object} param0
 * @param {string} param0.path
 */
async function getRequest({ path }) {
  return new Promise((resolve, reject) => {
    // axios.get(generateUrl({ path }), {
    //   headers: {},
    // })
    //   .then((res) => {
    //     console.log(res);
    //     return resolve(res);
    //   })
    //   .catch(error => reject(new Error(`GET ${path} ${error.message}`)));
    // fetch(generateUrl({ path }), {
    // //   mode: 'no-cors',
    //   method: 'GET',
    // })
    //   .then((res) => {
    //     console.log(res);
    //     if (res.ok) {
    //       return res.json();
    //     }
    //     return reject({ status: res.status });
    //   })
    //   .then((json) => {
    //     console.log(json);
    //     return resolve(json);
    //   })
    //   .catch(error => reject(new Error(`GET ${path} ${error.message}`)));
    setTimeout(() => {
      resolve([
        {
          cover: 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/4088/9781408855652.jpg',
          price: +'350',
          title: "Harry Potter and the Philosopher's Stone (I)",
          id: '9781408855652',
        },
        {
          cover: 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/4088/9781408855690.jpg',
          price: +'380',
          title: 'Harry Potter and the Order of the Phoenix (V)',
          id: '9781408855690',
        },
        {
          cover: 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/4088/9781408855690.jpg',
          price: +'380',
          title: 'Harry Potter and the Order of the Phoenix (V)',
          id: '9781408855690',
        },
        {
          cover: 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/4088/9781408855690.jpg',
          price: +'380',
          title: 'Harry Potter and the Order of the Phoenix (V)',
          id: '9781408855690',
        },
        {
          cover: 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/4088/9781408855690.jpg',
          price: +'380',
          title: 'Harry Potter and the Order of the Phoenix (V)',
          id: '9781408855690',
        },
        {
          cover: 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/5098/9781509809950.jpg',
          price: +'160',
          title: 'Solve For Happy',
          id: '9781509809950',
        },
        {
          cover: 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/4736/9781473634176.jpg',
          price: +'345',
          title: 'The Confidence Project',
          id: '9781473634176',
        },
      ]);
    }, 500);
  });
}


export {
  getRequest,
};
