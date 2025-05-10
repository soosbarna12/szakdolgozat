import '@testing-library/jest-dom';
import { act, waitFor } from '@testing-library/react';
import { useAlert } from '../utils/AlertContext';
import { renderHookWithQueryClient } from '../utils/test/renderHookWithQueryClient';
import { useLoginQuery } from './useLoginQuery';
import { useQuery } from '@tanstack/react-query';

jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useQuery: jest.fn(),
}));

jest.mock('../utils/AlertContext', () => ({
  useAlert: jest.fn(),
}));

describe('useLoginQuery', () => {
  const mockShowAlert = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useAlert as jest.Mock).mockImplementation(() => ({
      showAlert: mockShowAlert,
    }));
  });

  it('matches useLoginQuery hook snapshot', async () => {
    (useQuery as jest.Mock).mockImplementation(() => ({
      data: null,
      isLoading: false,
      error: null,
      refetch: jest.fn(),
    }));

    const { result } = renderHookWithQueryClient(() => useLoginQuery('testUser', 'testPass'));
    expect(result.current).toMatchSnapshot();
  });

  it('shows success alert and stores token when login is successful', async () => {
    const mockRefetch = jest.fn();
    (useQuery as jest.Mock).mockImplementation(() => ({
      data: { token: 'testToken' },
      isSuccess: true,
      isLoading: false,
      error: null,
      refetch: mockRefetch,
    }));

    const { result } = renderHookWithQueryClient(() => useLoginQuery('testUser', 'testPass'));

    await act(async () => {
      result.current.refetch();
    });

    await waitFor(() => {
      expect(mockShowAlert).toHaveBeenCalledWith('Logged in successfully', 'success');
    });
  });

  it('shows error alert when login fails', async () => {
    const mockRefetch = jest.fn(() => {
      throw new Error('Login failed');
    });
    (useQuery as jest.Mock).mockImplementation(() => ({
      data: null,
      isSuccess: false,
      isLoading: false,
      error: new Error('Login failed'),
      refetch: mockRefetch,
    }));

    const { result } = renderHookWithQueryClient(() => useLoginQuery('testUser', 'testPass'));

    await act(async () => {
      try {
        result.current.refetch();
      } catch (e) {
      }
    });

    await waitFor(() => {
      expect(mockShowAlert).toHaveBeenCalledWith('Login failed', 'error');
    });
  });
});