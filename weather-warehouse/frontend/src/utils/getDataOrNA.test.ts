import { getDataOrNA } from './getDataOrNA';

describe('utils/getDataOrNA', () => {
  it('returns the data if it is truthy', () => {
    expect(getDataOrNA('Valid Data')).toBe('Valid Data');
    expect(getDataOrNA(123)).toBe(123);
    expect(getDataOrNA(true)).toBe(true);
  });

  it('returns "N/A" if the data is falsy', () => {
    expect(getDataOrNA(null)).toBe('N/A');
    expect(getDataOrNA(undefined)).toBe('N/A');
    expect(getDataOrNA(0)).toBe('N/A');
    expect(getDataOrNA('')).toBe('N/A');
    expect(getDataOrNA(false)).toBe('N/A');
  });
});