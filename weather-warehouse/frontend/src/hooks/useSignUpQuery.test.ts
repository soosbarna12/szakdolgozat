import '@testing-library/jest-dom';
import { act, waitFor } from '@testing-library/react';
import { useAlert } from '../utils/AlertContext';
import { renderHookWithQueryClient } from '../utils/test/renderHookWithQueryClient';
import { useSignUpQuery } from './useSignUpQuery';
import { useQuery } from '@tanstack/react-query';

jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useQuery: jest.fn(),
}));

jest.mock('../utils/AlertContext', () => ({
  useAlert: jest.fn(),
}));

describe('useSignUpQuery', () => {
  const mockShowAlert = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useAlert as jest.Mock).mockImplementation(() => ({
      showAlert: mockShowAlert,
    }));
  });

  it('matches useSignUpQuery hook snapshot', async () => {
    (useQuery as jest.Mock).mockImplementation(() => ({
      data: {},
      isLoading: false,
      error: null,
      refetch: jest.fn(),
    }));

    const { result } = renderHookWithQueryClient(() =>
      useSignUpQuery('testUser', 'testPass', 'What is your pet’s name?', 'Fluffy')
    );

    expect(result.current).toMatchSnapshot();
  });

  it('shows success alert when user is registered successfully', async () => {
    const mockRefetch = jest.fn();
    (useQuery as jest.Mock).mockImplementation(() => ({
      data: {},
      isSuccess: true,
      isLoading: false,
      error: null,
      refetch: mockRefetch,
    }));

    const { result } = renderHookWithQueryClient(() =>
      useSignUpQuery('testUser', 'testPass', 'What is your pet’s name?', 'Fluffy')
    );

    await act(async () => {
      result.current.refetch();
    });

    await waitFor(() => {
      expect(mockShowAlert).toHaveBeenCalledWith('User registered successfully', 'success');
    });
  });

  it('shows error alert when registration fails', async () => {
    const mockRefetch = jest.fn(() => {
      throw new Error('Registration failed');
    });
    (useQuery as jest.Mock).mockImplementation(() => ({
      data: null,
      isLoading: false,
      error: new Error('Registration failed'),
      refetch: mockRefetch,
    }));

    const { result } = renderHookWithQueryClient(() =>
      useSignUpQuery('testUser', 'testPass', 'What is your pet’s name?', 'Fluffy')
    );

    await act(async () => {
      try {
        result.current.refetch();
      } catch (e) {
        // Handle error in test
      }
    });

    await waitFor(() => {
      expect(mockShowAlert).toHaveBeenCalledWith('Registration failed', 'error');
    });
  });
});