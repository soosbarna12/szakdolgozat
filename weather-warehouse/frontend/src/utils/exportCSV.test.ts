import { exportCSV } from './exportCSV';
import { download, generateCsv, mkConfig } from 'export-to-csv';
import { HistoricalDataTable } from '../types/historicalDataTable.type';

jest.mock('export-to-csv', () => ({
  download: jest.fn(),
  generateCsv: jest.fn(() => jest.fn()),
  mkConfig: jest.fn(),
}));

describe('utils/exportCSV', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('does nothing and logs an error if data is empty', () => {
    console.error = jest.fn(); // Mock console.error

    exportCSV([]);

    expect(console.error).toHaveBeenCalledWith('No data available to export.');
    expect(mkConfig).not.toHaveBeenCalled();
    expect(generateCsv).not.toHaveBeenCalled();
    expect(download).not.toHaveBeenCalled();
  });

  it('generates and downloads a CSV file when data is provided', () => {
    const mockData: HistoricalDataTable[] = [
      { date: '2023-05-01', cityName: 'New York', countryCode: 'US' },
      { date: '2023-05-02', cityName: 'Los Angeles', countryCode: 'US' },
    ];

    const mockCsvConfig = { useKeysAsHeaders: true, filename: 'historical_data' };
    const mockCsv = 'mockCsvContent';

    (mkConfig as jest.Mock).mockReturnValue(mockCsvConfig);
    (generateCsv as jest.Mock).mockReturnValue(() => mockCsv);

    exportCSV(mockData);

    expect(mkConfig).toHaveBeenCalledWith({ useKeysAsHeaders: true, filename: 'historical_data' });
    expect(generateCsv).toHaveBeenCalledWith(mockCsvConfig);
    expect(download).toHaveBeenCalledWith(mockCsv); // Ensure download is called with the CSV content
  });
});