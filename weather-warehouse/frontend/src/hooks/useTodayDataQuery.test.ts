import '@testing-library/jest-dom';
import { waitFor } from '@testing-library/react';
import { useAlert } from '../utils/AlertContext';
import axios from '../utils/axiosConfig';
import { renderHookWithQueryClient } from '../utils/test/renderHookWithQueryClient';
import { useTodayDataQuery } from './useTodayDataQuery';

jest.mock('../utils/AlertContext', () => ({
  useAlert: jest.fn(),
}));

jest.mock('../utils/axiosConfig');

describe('useTodayDataQuery', () => {
  const mockShowAlert = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useAlert as jest.Mock).mockImplementation(() => ({
      showAlert: mockShowAlert,
    }));
  });

  it('matches useTodayDataQuery hook snapshot', async () => {
    (axios.get as jest.Mock).mockReturnValue(Promise.resolve({ data: { temperature: 25 } }));

    const { result } = renderHookWithQueryClient(() => useTodayDataQuery('New York'));

    await waitFor(() => {
      expect(result.current.data).toEqual({ temperature: 25 });
    });

    expect(result.current).toMatchSnapshot();
  });

  it('fetches today’s weather data successfully', async () => {
    const mockWeatherData = { temperature: 25, humidity: 60 };
    (axios.get as jest.Mock).mockReturnValue(Promise.resolve({ data: mockWeatherData }));

    const { result } = renderHookWithQueryClient(() => useTodayDataQuery('New York'));

    await waitFor(() => {
      expect(result.current.data).toEqual(mockWeatherData);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
    });
  });

  it('shows error alert when fetching today’s weather data fails', async () => {
    (axios.get as jest.Mock).mockReturnValue(Promise.reject(new Error("Error fetching today's weather data")));

    const { result } = renderHookWithQueryClient(() => useTodayDataQuery('New York'));

    await waitFor(() => {
      expect(mockShowAlert).toHaveBeenCalledWith("Error fetching today's weather data", 'error');
      expect(result.current.error).not.toBeNull();
    });
  });

  it('throws an error when city is not found', async () => {
    (axios.get as jest.Mock).mockReturnValue(Promise.resolve({ data: { code: '404' } }));

    const { result } = renderHookWithQueryClient(() => useTodayDataQuery('InvalidCity'));

    await waitFor(() => {
      expect(result.current.error).not.toBeNull();
    });

    expect(mockShowAlert).toHaveBeenCalledWith("Error fetching today's weather data", 'error');
  });
});