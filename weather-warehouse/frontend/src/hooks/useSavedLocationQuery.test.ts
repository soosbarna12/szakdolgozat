import '@testing-library/jest-dom';
import { waitFor } from '@testing-library/react';
import { useAlert } from '../utils/AlertContext';
import axios from '../utils/axiosConfig';
import { renderHookWithQueryClient } from '../utils/test/renderHookWithQueryClient';
import { useSavedLocationQuery } from './useSavedLocationsQuery';

jest.mock('../utils/AlertContext', () => ({
  useAlert: jest.fn(),
}));

jest.mock('../utils/axiosConfig');

describe('useSavedLocationQuery', () => {
  const mockShowAlert = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    (axios.get as jest.Mock).mockReset();

    (useAlert as jest.Mock).mockImplementation(() => ({
      showAlert: mockShowAlert,
    }));
  });

  it('matches useSavedLocationQuery hook snapshot', async () => {
    (axios.get as jest.Mock).mockReturnValue(Promise.resolve({ data: [] }));

    const { result } = renderHookWithQueryClient(() => useSavedLocationQuery(true));

    await waitFor(() => {
      expect(result.current.savedLocations).toEqual([]);
    });

    expect(result.current).toMatchSnapshot();
  });

  it('fetches saved locations successfully', async () => {
    const mockSavedLocations = [
      { id: 1, name: 'New York', lat: 40.7128, lon: -74.006 },
      { id: 2, name: 'Los Angeles', lat: 34.0522, lon: -118.2437 },
    ];
    (axios.get as jest.Mock).mockReturnValue(Promise.resolve({ data: mockSavedLocations }));

    const { result } = renderHookWithQueryClient(() => useSavedLocationQuery(true));

    await waitFor(() => {
      expect(result.current.savedLocations).toEqual(mockSavedLocations);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
    });
  });

it('shows error alert when fetching saved locations fails', async () => {
  // Mock axios to reject with an error
  (axios.get as jest.Mock).mockReturnValue(Promise.reject(new Error('Error fetching saved locations')));

  // Render the hook
  const { result } = renderHookWithQueryClient(() => useSavedLocationQuery(true));

  // Debugging log to verify axios mock calls
  console.log('axios.get mock calls:', (axios.get as jest.Mock).mock.calls);

  // Wait for the error state to be set
  await waitFor(() => {
    expect(result.current.error).not.toBeNull();
  });

  // Assert that the alert was shown
  await waitFor(() => {
    expect(mockShowAlert).toHaveBeenCalledWith('Error fetching saved locations', 'error');
  });
});

  it('does not fetch data when "open" is false', async () => {
    const { result } = renderHookWithQueryClient(() => useSavedLocationQuery(false));

    expect(result.current.savedLocations).toBeUndefined();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });
});