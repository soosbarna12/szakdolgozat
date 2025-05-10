import '@testing-library/jest-dom';
import { waitFor } from '@testing-library/react';
import { useAlert } from '../utils/AlertContext';
import axios from '../utils/axiosConfig';
import { renderHookWithQueryClient } from '../utils/test/renderHookWithQueryClient';
import { useSavedLocationQuery } from './useSavedLocationsQuery';
import { useQuery } from '@tanstack/react-query';

jest.mock('@tanstack/react-query', () => {
  const actual = jest.requireActual('@tanstack/react-query');
  return {
    ...actual,
    useQuery: jest.fn(),
  };
});

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

    (useQuery as jest.Mock).mockReset();
    (useAlert as jest.Mock).mockImplementation(() => ({
      showAlert: mockShowAlert,
    }));
  });

  it('matches useSavedLocationQuery hook snapshot', async () => {  
    const mockSavedLocations = [
      { id: 1, name: 'New York', lat: 40.7128, lon: -74.006 },
      { id: 2, name: 'Los Angeles', lat: 34.0522, lon: -118.2437 },
    ];
    
    (useQuery as jest.Mock).mockImplementation(() => ({
      data: mockSavedLocations,
      isLoading: false,
      error: null,
    }));

    const { result } = renderHookWithQueryClient(() => useSavedLocationQuery(true));

    expect(result.current).toMatchSnapshot();
  });

  it('fetches saved locations successfully', async () => {
    const mockSavedLocations = [
      { id: 1, name: 'New York', lat: 40.7128, lon: -74.006 },
      { id: 2, name: 'Los Angeles', lat: 34.0522, lon: -118.2437 },
    ];
    
    (useQuery as jest.Mock).mockImplementation(() => ({
      data: mockSavedLocations,
      isLoading: false,
      error: null,
    }));

    const { result } = renderHookWithQueryClient(() => useSavedLocationQuery(true));

    await waitFor(() => {
      expect(result.current.savedLocations).toEqual(mockSavedLocations);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
    });
  });

it('shows error alert when fetching saved locations fails', async () => {
  (useQuery as jest.Mock).mockImplementation(() => ({
    data: null,
    isLoading: false,
    error: new Error('Error fetching saved locations'),
  }));

  const { result } = renderHookWithQueryClient(() => useSavedLocationQuery(true));

  await waitFor(() => {
    expect(result.current.error).not.toBeNull();
  });

  await waitFor(() => {
    expect(mockShowAlert).toHaveBeenCalledWith('Error fetching saved locations', 'error');
  });
});

  it('does not fetch data when "open" is false', async () => {
    (useQuery as jest.Mock).mockImplementation(() => ({
      data: undefined,
      isLoading: false,
      error: null,
    }));

    const { result } = renderHookWithQueryClient(() => useSavedLocationQuery(false));

    expect(result.current.savedLocations).toBeUndefined();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });
});