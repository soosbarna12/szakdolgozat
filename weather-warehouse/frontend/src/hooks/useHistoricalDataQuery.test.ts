import '@testing-library/jest-dom';
import { waitFor } from '@testing-library/react';
import { useAlert } from '../utils/AlertContext';
import axios from '../utils/axiosConfig';
import { convertServerHistoricalData } from '../utils/dataConverters';
import { renderHookWithQueryClient } from '../utils/test/renderHookWithQueryClient';
import { useHistoricalDataQuery } from './useHistoricalDataQuery';

jest.mock('../utils/AlertContext', () => ({
  useAlert: jest.fn(),
}));

jest.mock('../utils/axiosConfig');

jest.mock('../utils/dataConverters', () => ({
  convertServerHistoricalData: jest.fn(),
}));

describe('useHistoricalDataQuery', () => {
  const mockShowAlert = jest.fn();
  const mockLocation = { name: 'New York', lat: 40.7128, lon: -74.006 };
  const mockDate = '2023-01-01';
  const mockResponseData = [{ temperature: 5, humidity: 80 }];
  const mockConvertedData = [{ temperature: 5, humidity: 80, location: mockLocation }];

  beforeEach(() => {
    jest.clearAllMocks();
    (useAlert as jest.Mock).mockImplementation(() => ({
      showAlert: mockShowAlert,
    }));
  });

  it('matches useHistoricalDataQuery hook snapshot', async () => {
    (axios.post as jest.Mock).mockReturnValue({ data: mockResponseData });
    (convertServerHistoricalData as jest.Mock).mockReturnValueOnce(mockConvertedData);

    const { result } = renderHookWithQueryClient(() =>
      useHistoricalDataQuery({ location: mockLocation, date: mockDate })
    );

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
    });

    expect(result.current).toMatchSnapshot();
  });

  it('fetches historical data successfully and converts it', async () => {
    (axios.post as jest.Mock).mockReturnValue({ data: mockResponseData });
    (convertServerHistoricalData as jest.Mock).mockReturnValueOnce(mockConvertedData);

    const { result } = renderHookWithQueryClient(() =>
      useHistoricalDataQuery({ location: mockLocation, date: mockDate })
    );

    await waitFor(() => {
      console.log('result.current', result.current);
      expect(result.current.data).toEqual(mockConvertedData[0]);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
    });
  });

  it('returns an empty object when no data is found', async () => {
    (axios.post as jest.Mock).mockResolvedValueOnce({ data: [] });
    (convertServerHistoricalData as jest.Mock).mockReturnValueOnce([]);

    const { result } = renderHookWithQueryClient(() =>
      useHistoricalDataQuery({ location: mockLocation, date: mockDate })
    );

    await waitFor(() => {
      expect(result.current.data).toEqual({});
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
    });
  });

  it('does not fetch data when location or date is missing', async () => {
    const { result } = renderHookWithQueryClient(() =>
      useHistoricalDataQuery({ location: null, date: '' })
    );

    await waitFor(() => {
      expect(result.current.data).toBeUndefined();
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
    });

    expect(axios.post).not.toHaveBeenCalled();
  });
});