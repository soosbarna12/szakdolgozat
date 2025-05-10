import '@testing-library/jest-dom';
import { act, waitFor } from '@testing-library/react';
import { useAlert } from '../utils/AlertContext';
import axios from '../utils/axiosConfig';
import { renderHookWithQueryClient } from '../utils/test/renderHookWithQueryClient';
import { useDeleteLocationQuery } from './useDeleteLocationQuery';

jest.mock('../utils/AlertContext', () => ({
  useAlert: jest.fn(),
}));

jest.mock('../utils/axiosConfig');

describe('useDeleteLocationQuery', () => {
  const mockShowAlert = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useAlert as jest.Mock).mockImplementation(() => ({
      showAlert: mockShowAlert,
    }));
  });

  it('matches useDeleteLocationQuery hook snapshot', async () => {
    const { result } = renderHookWithQueryClient(() => useDeleteLocationQuery());

    expect(result.current).toMatchSnapshot();
  });

  it('shows success alert when location is deleted successfully', async () => {
    (axios.delete as jest.Mock).mockResolvedValueOnce({ data: {} });

    const { result } = renderHookWithQueryClient(() => useDeleteLocationQuery());

    await act(async () => {
      result.current.mutate(1);
    });

    await waitFor(() => {
      expect(mockShowAlert).toHaveBeenCalledWith('Location deleted successfully', 'success');
    });
  });

  it('shows error alert when location deletion fails', async () => {
    (axios.delete as jest.Mock).mockRejectedValueOnce(new Error('Failed to delete location'));

    const { result } = renderHookWithQueryClient(() => useDeleteLocationQuery());

    await act(async () => {
      result.current.mutate(1);
    });

    await waitFor(() => {
      expect(mockShowAlert).toHaveBeenCalledWith('Failed to delete location', 'error');
    });
  });
});