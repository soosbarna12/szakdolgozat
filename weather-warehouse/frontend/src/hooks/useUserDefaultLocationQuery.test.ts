import '@testing-library/jest-dom';
import { waitFor } from '@testing-library/react';
import { useAlert } from '../utils/AlertContext';
import axios from '../utils/axiosConfig';
import { renderHookWithQueryClient } from '../utils/test/renderHookWithQueryClient';
import { useUserDefaultLocationQuery } from './useUserDefaultLocationQuery';

jest.mock('../utils/AlertContext', () => ({
  useAlert: jest.fn(),
}));

jest.mock('../utils/axiosConfig');

describe('useUserDefaultLocationQuery', () => {
  const mockShowAlert = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useAlert as jest.Mock).mockImplementation(() => ({
      showAlert: mockShowAlert,
    }));
  });

  it('matches useUserDefaultLocationQuery hook snapshot', async () => {
    (axios.get as jest.Mock).mockReturnValue(Promise.resolve({ data: { city: 'New York' } }));

    const { result } = renderHookWithQueryClient(() => useUserDefaultLocationQuery(40.7128, -74.006));

    await waitFor(() => {
      expect(result.current.data).toEqual({ city: 'New York' });
    });

    expect(result.current).toMatchSnapshot();
  });

  it('fetches reverse geocoded location successfully', async () => {
    const mockLocationData = { city: 'New York', state: 'NY', country: 'US' };
    (axios.get as jest.Mock).mockReturnValue(Promise.resolve({ data: mockLocationData }));

    const { result } = renderHookWithQueryClient(() => useUserDefaultLocationQuery(40.7128, -74.006));

    await waitFor(() => {
      expect(result.current.data).toEqual(mockLocationData);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
    });
  });

  it('shows error alert when fetching reverse geocoded location fails', async () => {
    (axios.get as jest.Mock).mockReturnValue(Promise.reject(new Error('Failed to fetch reverse geocoded location')));

    const { result } = renderHookWithQueryClient(() => useUserDefaultLocationQuery(40.7128, -74.006));

    await waitFor(() => {
      expect(mockShowAlert).toHaveBeenCalledWith('Failed to fetch reverse geocoded location:', 'error');
      expect(result.current.error).not.toBeNull();
    });
  });
});