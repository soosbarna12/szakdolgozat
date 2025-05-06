import '@testing-library/jest-dom';
import { waitFor } from '@testing-library/react';
import { useAlert } from '../utils/AlertContext';
import { renderHookWithQueryClient } from '../utils/test/renderHookWithQueryClient';
import { useUserDefaultLocationQuery } from './useUserDefaultLocationQuery';
import { useQuery } from '@tanstack/react-query';

jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useQuery: jest.fn(),
}));

jest.mock('../utils/AlertContext', () => ({
  useAlert: jest.fn(),
}));

describe('useUserDefaultLocationQuery', () => {
  const mockShowAlert = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useAlert as jest.Mock).mockImplementation(() => ({
      showAlert: mockShowAlert,
    }));
  });

  it('matches useUserDefaultLocationQuery hook snapshot', async () => {
    (useQuery as jest.Mock).mockImplementation(() => ({
      data: { city: 'New York' },
      isLoading: false,
      isSuccess: true,
      error: null,
    }));

    const { result } = renderHookWithQueryClient(() => useUserDefaultLocationQuery(40.7128, -74.006));

    await waitFor(() => {
      expect(result.current.data).toEqual({ city: 'New York' });
    });

    expect(result.current).toMatchSnapshot();
  });

  it('fetches reverse geocoded location successfully', async () => {
    const mockLocationData = { city: 'New York', state: 'NY', country: 'US' };
    (useQuery as jest.Mock).mockImplementation(() => ({
      data: mockLocationData,
      isLoading: false,
      isSuccess: true,
      error: null,
    }));

    const { result } = renderHookWithQueryClient(() => useUserDefaultLocationQuery(40.7128, -74.006));

    await waitFor(() => {
      expect(result.current.data).toEqual(mockLocationData);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
    });
  });

  it('shows error alert when fetching reverse geocoded location fails', async () => {
    (useQuery as jest.Mock).mockImplementation(() => ({
      data: null,
      isLoading: false,
      isSuccess: false,
      error: new Error('Failed to fetch reverse geocoded location'),
    }));

    const { result } = renderHookWithQueryClient(() => useUserDefaultLocationQuery(40.7128, -74.006));

    await waitFor(() => {
      expect(mockShowAlert).toHaveBeenCalledWith('Failed to fetch reverse geocoded location:', 'error');
      expect(result.current.error).not.toBeNull();
    });
  });
});