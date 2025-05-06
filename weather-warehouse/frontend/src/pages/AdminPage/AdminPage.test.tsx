import '@testing-library/jest-dom';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { useAcceptUserMutation } from '../../hooks/useAcceptUserMutation';
import { useDeleteUserMutation } from '../../hooks/useDeleteUserMutation';
import { useFetchUsersQuery } from '../../hooks/useFetchUsersQuery';
import { renderWithQueryClient } from '../../utils/test/renderWithQueryClient';
import { AdminPage } from './AdminPage';

jest.mock('../../hooks/useAcceptUserMutation', () => ({
  useAcceptUserMutation: jest.fn(),
}));

jest.mock('../../hooks/useDeleteUserMutation', () => ({
  useDeleteUserMutation: jest.fn(),
}));

jest.mock('../../hooks/useFetchUsersQuery', () => ({
  useFetchUsersQuery: jest.fn(),
}));

// Mock react-leaflet components
jest.mock('react-leaflet', () => ({
  MapContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="dataMapContainer">{children}</div>
  ),
  TileLayer: () => <div data-testid="mockTileLayer">Mock TileLayer</div>,
}));

describe('pages/AdminPage', () => {
  const mockAcceptUserMutation = jest.fn().mockResolvedValueOnce({})
  const mockDeleteUserMutation = jest.fn().mockResolvedValueOnce({})
  const mockRefetch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useAcceptUserMutation as jest.Mock).mockReturnValue({
      mutateAsync: mockAcceptUserMutation,
    });
    (useDeleteUserMutation as jest.Mock).mockReturnValue({
      mutateAsync: mockDeleteUserMutation,
    });
    (useFetchUsersQuery as jest.Mock).mockReturnValue({
      data: [
        { userId: 1, username: 'user1', status: 'pending', isAdmin: false },
        { userId: 2, username: 'user2', status: 'active', isAdmin: false },
      ],
      error: null,
      isLoading: false,
      refetch: mockRefetch,
    });
  });

  it('matches AdminPage component snapshot', () => {
    const result = renderWithQueryClient(<AdminPage />);
    expect(result.container).toMatchSnapshot();
  });

  it('renders render shimmer loading state when loading', async () => {
    (useFetchUsersQuery as jest.Mock).mockReturnValue({
      data: null,
      error: null,
      isLoading: true,
      refetch: mockRefetch,
    });

    const result = renderWithQueryClient(<AdminPage />);

    expect(result.container).toMatchSnapshot();
  });

  it('renders error message when there is an error', () => {
    (useFetchUsersQuery as jest.Mock).mockReturnValue({
      data: null,
      error: true,
      isLoading: false,
      refetch: mockRefetch,
    });

    renderWithQueryClient(<AdminPage />);

    expect(screen.getByText('Error fetching data.')).toBeInTheDocument();
  });

  it('calls accept user mutation and refetches data', async () => {
    renderWithQueryClient(<AdminPage />);

    const acceptButton = screen.getAllByText('Accept');
    fireEvent.click(acceptButton[0]);

    await waitFor(() => {
      expect(mockAcceptUserMutation).toHaveBeenCalledWith(1);
      expect(mockRefetch).toHaveBeenCalled();
    });
  });

  it('calls delete user mutation and refetches data', async () => {
    renderWithQueryClient(<AdminPage />);

    const deleteButton = screen.getAllByText('Delete');
    fireEvent.click(deleteButton[0]);

    await waitFor(() => {
      expect(mockDeleteUserMutation).toHaveBeenCalledWith(1);
      expect(mockRefetch).toHaveBeenCalled();
    });
  });

  it('does not render delete button for admin users', () => {
    (useFetchUsersQuery as jest.Mock).mockReturnValue({
      data: [
        { userId: 1, username: 'admin', status: 'active', isAdmin: true },
      ],
      error: null,
      isLoading: false,
      refetch: mockRefetch,
    });

    renderWithQueryClient(<AdminPage />);

    expect(screen.queryByText('Delete')).toBeNull();
  });
});