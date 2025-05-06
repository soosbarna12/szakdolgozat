import '@testing-library/jest-dom';
import { act, waitFor } from '@testing-library/react';
import { useAlert } from '../utils/AlertContext';
import axios from '../utils/axiosConfig';
import { renderHookWithQueryClient } from '../utils/test/renderHookWithQueryClient';
import { useSaveLocationQuery } from './useSaveLocationQuery';

jest.mock('../utils/AlertContext', () => ({
  useAlert: jest.fn(),
}));

jest.mock('../utils/axiosConfig');

describe('useSaveLocationQuery', () => {
  const mockShowAlert = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useAlert as jest.Mock).mockImplementation(() => ({
      showAlert: mockShowAlert,
    }));
  });

  it('matches useSaveLocationQuery hook snapshot', async () => {
    (axios.post as jest.Mock).mockReturnValue(Promise.resolve({ data: {} }));

    const { result } = renderHookWithQueryClient(() =>
      useSaveLocationQuery([{ id: 1, name: 'Test Location' }])
    );

    expect(result.current).toMatchSnapshot();
  });

  it('shows success alert when location is saved successfully', async () => {
    (axios.post as jest.Mock).mockReturnValue(Promise.resolve({ data: {} }));

    const { result } = renderHookWithQueryClient(() =>
      useSaveLocationQuery([{ id: 1, name: 'Test Location' }])
    );

    await act(async () => {
      result.current.refetch();
    });

    await waitFor(() => {
      expect(mockShowAlert).toHaveBeenCalledWith('Location saved successfully', 'success');
    });
  });

  it('shows error alert when saving location fails', async () => {
    (axios.post as jest.Mock).mockReturnValue(Promise.reject(new Error("Can't save location")));

    const { result } = renderHookWithQueryClient(() =>
      useSaveLocationQuery([{ id: 1, name: 'Test Location' }])
    );

    await act(async () => {
      result.current.refetch();
    });

    await waitFor(() => {
      expect(mockShowAlert).toHaveBeenCalledWith("Can't save location", 'error');
    });
  });
});