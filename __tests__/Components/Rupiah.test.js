import {Rupiah} from '../../src/helpers/Rupiah';

describe('Test Rupiah', () => {
  test('should be rupiah', () => {
    expect(Rupiah('1000000')).toBe('Rp. 1.000.000');
  });
});
