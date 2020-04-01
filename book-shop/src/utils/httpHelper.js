import { PROXY_URL } from '../config';
import logger from './logger';

// import axios from 'axios';
/**
 *
 * @param {string} url
 * @returns {string}
 */
function generateProxyUrl(url) {
  const proxyUrl = PROXY_URL;
  return proxyUrl + url;
}

/**
 * @param {Object} param0
 * @param {string} param0.path
 */
async function getRequest(url) {
  const option = {
    // mode: 'no-cors',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return new Promise((resolve, reject) => {
    fetch(url, option)
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
      .catch((error) => {
        logger.debug('Retry Fetch data', error);
        fetch(generateProxyUrl(url), option)
          .then((res) => {
            if (res.ok) {
              return res.json();
            }
            return reject({ status: res.status });
          })
          .then(json => resolve(json))
          .catch(exception => reject(new Error(`GET ${url} ${exception.message}`)));
      });
  });
}


export {
  getRequest,
};
