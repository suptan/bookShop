import { ENABLED_PROXY, PROXY_URL } from '../config';
import logger from './logger';

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
        logger.debug(res);
        if (res.ok) {
          return res.json();
        }
        return reject({ status: res.status });
      })
      .then((json) => {
        logger.debug(json);
        return resolve(json);
      })
      .catch(error => reject(new Error(`GET ${url} ${error.message}`)));
  });
}


export {
  getRequest,
};
