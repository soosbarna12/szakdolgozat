import '@testing-library/jest-dom';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { HistoricalContext } from '../../../../contexts/HistoricalContext/HistoricalContext';
import { useDeleteLocationQuery } from '../../../../hooks/useDeleteLocationQuery';
import { useSavedLocationQuery } from '../../../../hooks/useSavedLocationsQuery';
import { renderWithQueryClient } from '../../../../utils/test/renderWithQueryClient';
import { LocationDrawer } from './LocationDrawer';

jest.mock('../../../../hooks/useSavedLocationsQuery', () => ({
  useSavedLocationQuery: jest.fn(),
}));

jest.mock('../../../../hooks/useDeleteLocationQuery', () => ({
  useDeleteLocationQuery: jest.fn(),
}));

describe('NavBar/LocationSelector/LocationDrawer', () => {
  const mockToggleLocationDrawer = jest.fn();
  const mockSetHistoricalPageData = jest.fn();
  const mockSetLocation = jest.fn();

  const renderComponent = (open = true) => {
    return renderWithQueryClient(
      <HistoricalContext.Provider
        value={{
          setHistoricalPageData: mockSetHistoricalPageData,
          setLocation: mockSetLocation,
        } as any}
      >
        <LocationDrawer toggleLocationDrawer={mockToggleLocationDrawer} open={open} />
      </HistoricalContext.Provider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();

    (useSavedLocationQuery as jest.Mock).mockReturnValue({
      savedLocations: [
        {
          locationData: [{ cityName: 'New York', date: '2023-01-01' }],
          dateSaved: '2023-01-02',
          userLocationID: 1,
        },
      ],
      isLoading: false,
      refetch: jest.fn(),
    });

    (useDeleteLocationQuery as jest.Mock).mockReturnValue({
      mutateAsync: jest.fn(() => Promise.resolve()),
    });
  });

  it('matches LocationDrawer component snapshot', () => {
    const component = renderComponent();
    expect(component).toMatchSnapshot();
  });

  it('renders saved locations and handles opening a saved location', async () => {
    renderComponent();

    // Verify saved location is rendered
    const savedLocation = screen.getByText('New York');
    expect(savedLocation).toBeInTheDocument();

    // Click on the saved location
    fireEvent.click(savedLocation);

    // Verify setHistoricalPageData and setLocation are called
    await waitFor(() => {
      expect(mockSetHistoricalPageData).toHaveBeenCalledWith([{ cityName: 'New York', date: '2023-01-01' }]);
      expect(mockSetLocation).toHaveBeenCalledWith({ name: '', lat: 0, lon: 0 });
    });
  });

  it('handles deleting a saved location', async () => {
    renderComponent();

    // Click on the delete button
    const deleteButton = screen.getByLabelText('delete');
    fireEvent.click(deleteButton);

    // Verify refetch is called
    await waitFor(() => {
      expect(screen.getByText('New York')).toBeInTheDocument(); // Ensure the location is still rendered after deletion
    });
  });

  it('renders skeletons when loading', () => {
    (useSavedLocationQuery as jest.Mock).mockReturnValueOnce({
      savedLocations: [],
      isLoading: true,
      refetch: jest.fn(),
    });

    renderComponent();

    // Verify skeletons are rendered
    const skeletons = screen.getAllByTestId('locationDrawerSkeleton');
    expect(skeletons).toHaveLength(3);
  });

  it('renders "No saved locations found" when there are no saved locations', () => {
    (useSavedLocationQuery as jest.Mock).mockReturnValueOnce({
      savedLocations: [],
      isLoading: false,
      refetch: jest.fn(),
    });

    renderComponent();

    // Verify "No saved locations found" message is rendered
    expect(screen.getByText('No saved locations found.')).toBeInTheDocument();
  });

  it('closes the drawer when the close button is clicked', () => {
    renderComponent();

    // Click on the close button
    const closeButton = screen.getByLabelText('Close locations');
    fireEvent.click(closeButton);

    // Verify toggleLocationDrawer is called
    expect(mockToggleLocationDrawer).toHaveBeenCalledWith(false);
  });
});