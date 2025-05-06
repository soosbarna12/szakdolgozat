import '@testing-library/jest-dom';
import { waitFor } from '@testing-library/react';
import axios from '../utils/axiosConfig';
import { renderHookWithQueryClient } from '../utils/test/renderHookWithQueryClient';
import { useHistoricalDates } from './useHistoricalDates';

jest.mock('../utils/axiosConfig');

describe('useHistoricalDates', () => {
  const mockResponseData = [{date: '2023-01-01'}, {date: '2023-01-02'}, {date: '2023-01-03'}];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('matches useHistoricalDates hook snapshot', async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockResponseData });

    const { result } = renderHookWithQueryClient(() => useHistoricalDates('New York'));

    await waitFor(() => {
      expect(result.current.data).toEqual(mockResponseData.map((date: any) => date.date));
    });

    expect(result.current).toMatchSnapshot();
  });

  it('fetches historical dates successfully', async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockResponseData });

    const { result } = renderHookWithQueryClient(() => useHistoricalDates('New York'));

    await waitFor(() => {
      expect(result.current.data).toEqual(mockResponseData.map((date: any) => date.date));
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
    });
  });

  it('returns an empty array when no data is found', async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: [] });

    const { result } = renderHookWithQueryClient(() => useHistoricalDates('New York'));

    await waitFor(() => {
      expect(result.current.data).toEqual([]);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
    });
  });

  it('does not fetch data when location is empty', async () => {
    const { result } = renderHookWithQueryClient(() => useHistoricalDates(''));

    await waitFor(() => {
      expect(result.current.data).toEqual([]);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
    });

    expect(axios.get).not.toHaveBeenCalled();
  });
});