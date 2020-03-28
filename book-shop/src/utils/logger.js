// Not support on web browser
// import winston from 'winston';
// import { NODE_ENV, ALLOW_LOG_LEVEL } from '../config';

/**
 * @param {stirng} message
 * @param {Object} obj
 */
function debug(message, obj) { console.log(message, JSON.stringify(obj) || ''); }
/**
 * @param {Error} ex
 */
function error(ex) { console.log(ex); }

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
