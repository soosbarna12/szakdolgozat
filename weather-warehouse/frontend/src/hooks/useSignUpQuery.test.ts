import '@testing-library/jest-dom';
import { act, waitFor } from '@testing-library/react';
import { useAlert } from '../utils/AlertContext';
import axios from '../utils/axiosConfig';
import { renderHookWithQueryClient } from '../utils/test/renderHookWithQueryClient';
import { useSignUpQuery } from './useSignUpQuery';

jest.mock('../utils/AlertContext', () => ({
  useAlert: jest.fn(),
}));

jest.mock('../utils/axiosConfig');

describe('useSignUpQuery', () => {
  const mockShowAlert = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useAlert as jest.Mock).mockImplementation(() => ({
      showAlert: mockShowAlert,
    }));
  });

  it('matches useSignUpQuery hook snapshot', async () => {
    (axios.post as jest.Mock).mockReturnValue(Promise.resolve({ data: {} }));

    const { result } = renderHookWithQueryClient(() =>
      useSignUpQuery('testUser', 'testPass', 'What is your pet’s name?', 'Fluffy')
    );

    expect(result.current).toMatchSnapshot();
  });

  it('shows success alert when user is registered successfully', async () => {
    (axios.post as jest.Mock).mockReturnValue(Promise.resolve({ data: {} }));

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
    (axios.post as jest.Mock).mockReturnValue(Promise.reject(new Error('Registration failed')));

    const { result } = renderHookWithQueryClient(() =>
      useSignUpQuery('testUser', 'testPass', 'What is your pet’s name?', 'Fluffy')
    );

    await act(async () => {
      result.current.refetch();
    });

    await waitFor(() => {
      expect(mockShowAlert).toHaveBeenCalledWith('Registration failed', 'error');
    });
  });
});