import '@testing-library/jest-dom';
import { waitFor } from '@testing-library/react';
import { useLSTMForecast } from './useLSTMForecast';
import { renderHookWithQueryClient } from '../utils/test/renderHookWithQueryClient';
import { useQuery } from '@tanstack/react-query';

jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useQuery: jest.fn(),
}));

describe('hooks/useLSTMForecast', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches forecast data successfully', async () => {
    const mockForecastData = [
      { date: '2025-05-08', temperature: 22.5 },
      { date: '2025-05-09', temperature: 24.0 },
    ];

    (useQuery as jest.Mock).mockImplementation(() => ({
      data: mockForecastData,
      isLoading: false,
      error: null,
    }));

    const { result } = renderHookWithQueryClient(() => useLSTMForecast('Budapest'));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
      expect(result.current.data).toEqual(mockForecastData);
    });
  });

  it('handles errors when fetching forecast data', async () => {
    (useQuery as jest.Mock).mockImplementation(() => ({
      data: null,
      isLoading: false,
      error: new Error('Failed to fetch forecast'),
    }));

    const { result } = renderHookWithQueryClient(() => useLSTMForecast('Budapest'));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeTruthy();
      expect(result.current.data).toBeNull();
    });
  });

  it('does not fetch data when locationName is empty', async () => {
    (useQuery as jest.Mock).mockImplementation(() => ({
      data: undefined,
      isLoading: false,
      error: null,
    }));

    const { result } = renderHookWithQueryClient(() => useLSTMForecast(''));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
      expect(result.current.data).toBeUndefined();
    });
  });
});