import { exportCSV } from './exportCSV';
import { generateCsv, mkConfig } from 'export-to-csv';

jest.mock('export-to-csv', () => ({
  generateCsv: jest.fn(() => jest.fn()),
  mkConfig: jest.fn(),
  download: jest.fn(() => jest.fn()),
}));

describe('utils/exportCSV', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('does nothing and logs an error if data is empty', () => {
    console.error = jest.fn();

    exportCSV([]);

    expect(mkConfig).not.toHaveBeenCalled();
    expect(generateCsv).not.toHaveBeenCalled();
  });

  it('generates and downloads a CSV file when data is provided', () => {
    const mockData = [
      { date: '2023-05-01', cityName: 'New York', countryCode: 'US' } as any,
      { date: '2023-05-02', cityName: 'Los Angeles', countryCode: 'US' } as any,
    ];

    const mockCsvConfig = { useKeysAsHeaders: true, filename: 'historical_data' };
    const mockDownload = jest.fn();

    (mkConfig as jest.Mock).mockReturnValue(mockCsvConfig);
    (generateCsv as jest.Mock).mockReturnValue(mockDownload);

    exportCSV(mockData);

    expect(mkConfig).toHaveBeenCalledWith({ useKeysAsHeaders: true, filename: 'historical_data' });
    expect(generateCsv).toHaveBeenCalledWith(mockCsvConfig);
    expect(mockDownload).toHaveBeenCalledWith(mockData);
  });
});