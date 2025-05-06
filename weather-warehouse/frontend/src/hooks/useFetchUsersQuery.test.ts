import '@testing-library/jest-dom';
import { waitFor } from '@testing-library/react';
import axios from '../utils/axiosConfig';
import { renderHookWithQueryClient } from '../utils/test/renderHookWithQueryClient';
import { useFetchUsersQuery } from './useFetchUsersQuery';

jest.mock('../utils/axiosConfig');

describe('useFetchUsersQuery', () => {
  const mockUsers = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' },
  ];

  afterEach(() => {
    jest.clearAllMocks();
    (axios.get as jest.Mock).mockReset();
  });

  beforeEach(() => {
  });

  it('matches useFetchUsersQuery hook snapshot', async () => {
    (axios.get as jest.Mock).mockReturnValue({ data: mockUsers });
    const { result } = renderHookWithQueryClient(() => useFetchUsersQuery());

    await waitFor(() => {
      expect(result.current.data).not.toBeUndefined();
    });

    expect(result.current).toMatchSnapshot();
  });

  it('fetches users successfully', async () => {
    (axios.get as jest.Mock).mockReturnValue({ data: mockUsers });

    const { result } = renderHookWithQueryClient(() => useFetchUsersQuery());

    await waitFor(() => {
      expect(result.current.data).toEqual(mockUsers);
      expect(result.current.isLoading).toBe(false);
    });
  });

  it('allows refetching users', async () => {
    (axios.get as jest.Mock).mockReturnValue({ data: mockUsers });

    const { result } = renderHookWithQueryClient(() => useFetchUsersQuery());

    await waitFor(() => {
      expect(result.current.data).toEqual(mockUsers);
    });

    (axios.get as jest.Mock).mockReturnValue({ data: [] });

    await result.current.refetch();

    await waitFor(() => {
      expect(result.current.data).toEqual([]);
    });
  });
});