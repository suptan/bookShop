import normalizer from '@/utils/normalizer';

describe('utils/normalizer', () => {
  describe('THBCurrency', () => {
    it('should format number to currency', () => {
      const input = 1234567;
      const result = normalizer.THBCurrency(input);

      expect(result).toBe('THB1,234,567.00');
    });

    it('should format number to currency when no param', () => {
      const result = normalizer.THBCurrency();

      expect(result).toBe('THB0.00');
    });

    it('should format number to currency with undefined param', () => {
      const result = normalizer.THBCurrency(undefined);

      expect(result).toBe('THB0.00');
    });
  });
});
