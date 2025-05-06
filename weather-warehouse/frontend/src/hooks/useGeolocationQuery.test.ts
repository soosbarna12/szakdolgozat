import '@testing-library/jest-dom';
import { waitFor } from '@testing-library/react';
import { Pages } from '../types/page.type';
import axios from '../utils/axiosConfig';
import { renderHookWithQueryClient } from '../utils/test/renderHookWithQueryClient';
import { useGeolocationQuery } from './useGeolocationQuery';

jest.mock('../utils/axiosConfig');

describe('useGeolocationQuery', () => {
  const mockLocationName = 'New York';
  const mockResponseData = [
    { name: 'New York', state: 'NY', country: 'US' },
    { name: 'New York', state: 'NY', country: 'US' }, // Duplicate to test filtering
    { name: 'Los Angeles', state: 'CA', country: 'US' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('matches useGeolocationQuery hook snapshot', async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockResponseData });

    const { result } = renderHookWithQueryClient(() =>
      useGeolocationQuery(mockLocationName, Pages.Today)
    );
    
    await waitFor(() => {
      expect(result.current.data).not.toBeUndefined();
    });


    expect(result.current).toMatchSnapshot();
  });

  it('fetches geolocation data successfully and filters unique results', async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockResponseData });

    const { result } = renderHookWithQueryClient(() =>
      useGeolocationQuery(mockLocationName, Pages.Today)
    );

    await waitFor(() => {
      expect(result.current.data).toEqual([
        { name: 'New York', state: 'NY', country: 'US' },
        { name: 'Los Angeles', state: 'CA', country: 'US' },
      ]);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
    });
  });

  it('returns an undefined array when no location name is provided', async () => {
    const { result } = renderHookWithQueryClient(() =>
      useGeolocationQuery('', Pages.Today)
    );

    await waitFor(() => {
      expect(result.current.data).toEqual(undefined);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
    });
  });

  it('returns an empty array when no data is found', async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: [] });

    const { result } = renderHookWithQueryClient(() =>
      useGeolocationQuery(mockLocationName, Pages.Today)
    );

    await waitFor(() => {
      expect(result.current.data).toEqual([]);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
    });
  });

  it('does not fetch data when type is not Pages.Today', async () => {
    const { result } = renderHookWithQueryClient(() =>
      useGeolocationQuery(mockLocationName, Pages.Historical)
    );

    await waitFor(() => {
      expect(result.current.data).toEqual([]);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
    });

    expect(axios.get).not.toHaveBeenCalled();
  });
});