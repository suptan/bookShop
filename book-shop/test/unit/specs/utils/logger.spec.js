import logger from '@/utils/logger';

jest.mock('@/config.js', () => ({
  ALLOW_LOG_LEVEL: 'debug',
}));

describe('utils/logger.js', () => {
  describe('debug()', () => {
    it('should print out debug', () => {
      logger.debug('I\'m debugging');
    });
  });
  describe('error()', () => {
    it('should print out error', () => {
      logger.error('this is error');
    });
  });
});
