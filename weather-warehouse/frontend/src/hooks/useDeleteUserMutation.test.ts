import '@testing-library/jest-dom';
import { act, waitFor } from '@testing-library/react';
import { useAlert } from '../utils/AlertContext';
import axios from '../utils/axiosConfig';
import { renderHookWithQueryClient } from '../utils/test/renderHookWithQueryClient';
import { useDeleteUserMutation } from './useDeleteUserMutation';

jest.mock('../utils/AlertContext', () => ({
  useAlert: jest.fn(),
}));

jest.mock('../utils/axiosConfig');

describe('useDeleteUserMutation', () => {
  const mockShowAlert = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useAlert as jest.Mock).mockImplementation(() => ({
      showAlert: mockShowAlert,
    }));
  });

  it('matches useDeleteUserMutation hook snapshot', async () => {
    const { result } = renderHookWithQueryClient(() => useDeleteUserMutation());

    expect(result.current).toMatchSnapshot();
  });

  it('shows success alert when user is deleted successfully', async () => {
    (axios.delete as jest.Mock).mockResolvedValueOnce({ data: {} });

    const { result } = renderHookWithQueryClient(() => useDeleteUserMutation());

    await act(async () => {
      result.current.mutate(1);
    });

    await waitFor(() => {
      expect(mockShowAlert).toHaveBeenCalledWith('User deleted successfully', 'success');
    });
  });

  it('shows error alert when user deletion fails', async () => {
    (axios.delete as jest.Mock).mockRejectedValueOnce(new Error('Failed to delete user'));

    const { result } = renderHookWithQueryClient(() => useDeleteUserMutation());

    await act(async () => {
      result.current.mutate(1);
    });

    await waitFor(() => {
      expect(mockShowAlert).toHaveBeenCalledWith('Failed to delete user', 'error');
    });
  });
});