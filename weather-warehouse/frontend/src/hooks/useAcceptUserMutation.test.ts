import '@testing-library/jest-dom';
import { act } from '@testing-library/react';
import { useAlert } from '../utils/AlertContext';
import axios from '../utils/axiosConfig';
import { renderHookWithQueryClient } from '../utils/test/renderHookWithQueryClient';
import { useAcceptUserMutation } from './useAcceptUserMutation';

jest.mock('../utils/AlertContext', () => ({
  useAlert: jest.fn(),
}));

jest.mock('../utils/axiosConfig');

describe('useAcceptUserMutation', () => {
  const mockShowAlert = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useAlert as jest.Mock).mockImplementation(() => ({
      showAlert: mockShowAlert,
    }));
  });

  it('shows success alert when user is accepted successfully', async () => {
    (axios.post as jest.Mock).mockResolvedValueOnce({ data: {} });

    const { result } = renderHookWithQueryClient(() => useAcceptUserMutation());

    await act(async () => {
      result.current.mutate(1); // Simulate accepting a user with ID 1
    });

    expect(mockShowAlert).toHaveBeenCalledWith('User accepted successfully', 'success');
  });

  it('shows error alert when user acceptance fails', async () => {
    (axios.post as jest.Mock).mockRejectedValueOnce(new Error('Failed to accept user'));

    const { result } = renderHookWithQueryClient(() => useAcceptUserMutation());

    await act(async () => {
      result.current.mutate(1); // Simulate accepting a user with ID 1
    });

    expect(mockShowAlert).toHaveBeenCalledWith('Failed to accept user', 'error');
  });
});