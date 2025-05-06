import '@testing-library/jest-dom';
import { waitFor } from '@testing-library/react';
import { useAlert } from '../utils/AlertContext';
import { renderHookWithQueryClient } from '../utils/test/renderHookWithQueryClient';
import { useTodayDataQuery } from './useTodayDataQuery';
import { useQuery } from '@tanstack/react-query';

jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useQuery: jest.fn(),
}));

jest.mock('../utils/AlertContext', () => ({
  useAlert: jest.fn(),
}));

describe('useTodayDataQuery', () => {
  const mockShowAlert = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useAlert as jest.Mock).mockImplementation(() => ({
      showAlert: mockShowAlert,
    }));
  });

  it('matches useTodayDataQuery hook snapshot', async () => {
    (useQuery as jest.Mock).mockImplementation(() => ({
      data: { temperature: 25 },
      isLoading: false,
      isSuccess: true,
      error: null,
    }));

    const { result } = renderHookWithQueryClient(() => useTodayDataQuery('New York'));

    await waitFor(() => {
      expect(result.current.data).toEqual({ temperature: 25 });
    });

    expect(result.current).toMatchSnapshot();
  });

  it('fetches today’s weather data successfully', async () => {
    const mockWeatherData = { temperature: 25, humidity: 60 };
    (useQuery as jest.Mock).mockImplementation(() => ({
      data: mockWeatherData,
      isLoading: false,
      isSuccess: true,
      error: null,
    }));

    const { result } = renderHookWithQueryClient(() => useTodayDataQuery('New York'));

    await waitFor(() => {
      expect(result.current.data).toEqual(mockWeatherData);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
    });
  });

  it('shows error alert when fetching today’s weather data fails', async () => {
    (useQuery as jest.Mock).mockImplementation(() => ({
      data: null,
      isLoading: false,
      isSuccess: false,
      error: new Error("Error fetching today's weather data"),
    }));

    const { result } = renderHookWithQueryClient(() => useTodayDataQuery('New York'));

    await waitFor(() => {
      expect(mockShowAlert).toHaveBeenCalledWith("Error fetching today's weather data", 'error');
      expect(result.current.error).not.toBeNull();
    });
  });

  it('throws an error when city is not found', async () => {
    (useQuery as jest.Mock).mockImplementation(() => ({
      data: { code: '404' },
      isLoading: false,
      isSuccess: false,
      error: new Error('City not found'),
    }));

    const { result } = renderHookWithQueryClient(() => useTodayDataQuery('InvalidCity'));

    await waitFor(() => {
      expect(result.current.error).not.toBeNull();
    });

    expect(mockShowAlert).toHaveBeenCalledWith("Error fetching today's weather data", 'error');
  });
});