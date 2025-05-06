import '@testing-library/jest-dom';
import { waitFor } from '@testing-library/react';
import { useAlert } from '../utils/AlertContext';
import axios from '../utils/axiosConfig';
import { renderHookWithQueryClient } from '../utils/test/renderHookWithQueryClient';
import { useHistoricalLocations } from './useHistoricalLocations';
import { Pages } from '../types/page.type';

jest.mock('../utils/AlertContext', () => ({
  useAlert: jest.fn(),
}));

jest.mock('../utils/axiosConfig');

describe('useHistoricalLocations', () => {
  const mockShowAlert = jest.fn();
  const mockPartialLocation = 'New York';
  const mockResponseData = [
    { name: 'New York', state: 'NY', country: 'US' },
    { name: 'Los Angeles', state: 'CA', country: 'US' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (useAlert as jest.Mock).mockImplementation(() => ({
      showAlert: mockShowAlert,
    }));
  });

  it('matches useHistoricalLocations hook snapshot', async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockResponseData });

    const { result } = renderHookWithQueryClient(() =>
      useHistoricalLocations(mockPartialLocation, Pages.Historical)
    );

    await waitFor(() => {
      expect(result.current.data).toEqual(mockResponseData);
    });

    expect(result.current).toMatchSnapshot();
  });

  it('fetches historical locations successfully', async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockResponseData });

    const { result } = renderHookWithQueryClient(() =>
      useHistoricalLocations(mockPartialLocation, Pages.Historical)
    );

    await waitFor(() => {
      expect(result.current.data).toEqual(mockResponseData);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
    });
  });

  it('returns an empty array when no data is found', async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: [] });

    const { result } = renderHookWithQueryClient(() =>
      useHistoricalLocations(mockPartialLocation, Pages.Historical)
    );

    await waitFor(() => {
      expect(result.current.data).toEqual([]);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
    });
  });

  it('does not fetch data when inputPartialLocation is empty or type is not Historical', async () => {
    const { result } = renderHookWithQueryClient(() =>
      useHistoricalLocations('', Pages.Today)
    );

    await waitFor(() => {
      expect(result.current.data).toEqual([]);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
    });

    expect(axios.get).not.toHaveBeenCalled();
  });
});