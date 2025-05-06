import '@testing-library/jest-dom';
import { act, waitFor } from '@testing-library/react';
import { useAlert } from '../utils/AlertContext';
import axios from '../utils/axiosConfig';
import { renderHookWithQueryClient } from '../utils/test/renderHookWithQueryClient';
import { useLoginQuery } from './useLoginQuery';

jest.mock('../utils/AlertContext', () => ({
  useAlert: jest.fn(),
}));

jest.mock('../utils/axiosConfig');

describe('useLoginQuery', () => {
  const mockShowAlert = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    (axios.post as jest.Mock).mockReset();

    (useAlert as jest.Mock).mockImplementation(() => ({
      showAlert: mockShowAlert,
    }));
  });

  it('matches useLoginQuery hook snapshot', async () => {
    const { result } = renderHookWithQueryClient(() => useLoginQuery('testUser', 'testPass'));
    expect(result.current).toMatchSnapshot();
  });

  it('shows success alert and stores token when login is successful', async () => {
    (axios.post as jest.Mock).mockReturnValue({ data: { token: 'testToken' } });

    const { result } = renderHookWithQueryClient(() => useLoginQuery('testUser', 'testPass'));

    await act(async () => {
      result.current.refetch();
    });

    await waitFor(() => {
      expect(mockShowAlert).toHaveBeenCalledWith('Logged in successfully', 'success');
      expect(localStorage.getItem('token')).toBe('testToken');
    });
  });

  it('shows error alert when login fails', async () => {
    (axios.post as jest.Mock).mockRejectedValueOnce(new Error('Login failed'));

    const { result } = renderHookWithQueryClient(() => useLoginQuery('testUser', 'testPass'));

    await act(async () => {
      result.current.refetch();
    });

    await waitFor(() => {
      expect(mockShowAlert).toHaveBeenCalledWith('Login failed', 'error');
    });
  });
});