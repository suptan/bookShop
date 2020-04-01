// Not support on web browser
// import winston from 'winston';
import { ALLOW_LOG_LEVEL } from '../config';

/**
 * @param {string} message
 * @param {Object} obj
 */
function debug(message, obj) {
  if (ALLOW_LOG_LEVEL === 'debug') {
    console.log(message, obj || ''); // eslint-disable-line
  }
}
/**
 * @param {Error} ex
 */
function error(ex) {
  console.log(ex); // eslint-disable-line
}

const logger = {
  debug,
  error,
};
// winston.createLogger({
//   level: ALLOW_LOG_LEVEL,
//   format: winston.format.json(),
//   transports: [
//     // new Sentry([]),
//   ],
// });

// if (NODE_ENV !== 'production') {
//   logger.add(new BrowserConsole({
//     format: winston.format.simple(),
//   }));
// }

export default logger;
