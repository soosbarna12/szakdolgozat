import { getRowId } from './getRowId';

describe('utils/getRowId', () => {
it('returns the correct row ID for a valid HistoricalDataTable object', () => {
  const row = { date: '2023-05-01', cityName: 'New York', countryCode: 'US' };
  const result = getRowId(row as any);
  expect(result).toBe('2023-05-01New YorkUS');
});

it('returns the correct row ID when date, cityName, and countryCode are empty strings', () => {
  const row = { date: '', cityName: '', countryCode: '' };
  const result = getRowId(row as any);
  expect(result).toBe('');
});

it('returns the correct row ID when date, cityName, and countryCode contain special characters', () => {
  const row = { date: '2023-05-01', cityName: 'São Paulo', countryCode: 'BR' };
  const result = getRowId(row as any );
  expect(result).toBe('2023-05-01São PauloBR');
});

it('returns the correct row ID when date, cityName, and countryCode contain numeric values', () => {
  const row = { date: '2023-05-01', cityName: 'City123', countryCode: '123' };
  const result = getRowId(row as any);
  expect(result).toBe('2023-05-01City123123');
});
    
});