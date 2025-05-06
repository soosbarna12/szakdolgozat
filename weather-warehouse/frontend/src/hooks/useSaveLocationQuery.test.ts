import '@testing-library/jest-dom';
import { act, waitFor } from '@testing-library/react';
import { useAlert } from '../utils/AlertContext';
import { renderHookWithQueryClient } from '../utils/test/renderHookWithQueryClient';
import { useSaveLocationQuery } from './useSaveLocationQuery';
import { useQuery } from '@tanstack/react-query';

jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useQuery: jest.fn(),
}));

jest.mock('../utils/AlertContext', () => ({
  useAlert: jest.fn(),
}));

describe('useSaveLocationQuery', () => {
  const mockShowAlert = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useAlert as jest.Mock).mockImplementation(() => ({
      showAlert: mockShowAlert,
    }));
  });

  it('matches useSaveLocationQuery hook snapshot', async () => {
    (useQuery as jest.Mock).mockImplementation(() => ({
      data: {},
      isLoading: false,
      error: null,
      refetch: jest.fn(),
    }));

    const { result } = renderHookWithQueryClient(() =>
      useSaveLocationQuery([{ id: 1, name: 'Test Location' } as any])
    );

    expect(result.current).toMatchSnapshot();
  });

  it('shows success alert when location is saved successfully', async () => {
    const mockRefetch = jest.fn();
    (useQuery as jest.Mock).mockImplementation(() => ({
      data: {},
      isSuccess: true,
      isLoading: false,
      error: null,
      refetch: mockRefetch,
    }));

    const { result } = renderHookWithQueryClient(() =>
      useSaveLocationQuery([{ id: 1, name: 'Test Location' } as any])
    );

    await act(async () => {
      result.current.refetch();
    });

    await waitFor(() => {
      expect(mockShowAlert).toHaveBeenCalledWith('Location saved successfully', 'success');
    });
  });

  it('shows error alert when saving location fails', async () => {
    const mockRefetch = jest.fn(() => {
      throw new Error("Can't save location");
    });
    (useQuery as jest.Mock).mockImplementation(() => ({
      data: null,
      isLoading: false,
      error: new Error("Can't save location"),
      refetch: mockRefetch,
    }));

    const { result } = renderHookWithQueryClient(() =>
      useSaveLocationQuery([{ id: 1, name: 'Test Location' } as any])
    );

    await act(async () => {
      try {
        result.current.refetch();
      } catch (e) {
        // Handle error in test
      }
    });

    await waitFor(() => {
      expect(mockShowAlert).toHaveBeenCalledWith("Can't save location", 'error');
    });
  });
});