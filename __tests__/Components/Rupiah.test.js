import {Rupiah} from '../../src/helpers/Rupiah';

describe('Test Rupiah', () => {
  test('should be rupiah', () => {
    expect(Rupiah('1000000')).toBe('Rp. 1.000.000');
  });
  test('should be rupiah v2', () => {
    expect(Rupiah('958343')).toBe('Rp. 958.343');
  });
});
