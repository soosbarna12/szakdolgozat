import '@testing-library/jest-dom';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { useHistoricalDataQuery } from '../../hooks/useHistoricalDataQuery';
import { useSaveLocationQuery } from '../../hooks/useSaveLocationQuery';
import { renderWithQueryClient } from '../../utils/test/renderWithQueryClient';
import { HistoricalPage } from './HistoricalPage';

jest.mock('../../hooks/useHistoricalDataQuery', () => ({
  useHistoricalDataQuery: jest.fn(),
}));

jest.mock('../../hooks/useSaveLocationQuery', () => ({
  useSaveLocationQuery: jest.fn(),
}));

jest.mock('../../utils/exportCSV', () => ({
  exportCSV: jest.fn(),
}));

jest.mock('react-leaflet', () => ({
  MapContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="dataMapContainer">{children}</div>
  ),
  TileLayer: () => <div data-testid="mockTileLayer">Mock TileLayer</div>,
  useMap: jest.fn(() => ({
    setView: jest.fn(),
  })),
}));

describe('pages/HistoricalPage', () => {
  const mockRefetchSaveLocationQuery = jest.fn();
  const mockExportCSV = jest.requireMock('../../utils/exportCSV').exportCSV;

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.setItem('token', 'mockToken');
    (useHistoricalDataQuery as jest.Mock).mockReturnValue({
      data: [
        { date: '2023-01-01', cityName: "New York", countryCode: "US", lat: 40.7128, lon: -74.006, temperature: 5 },
      ],
      error: null,
      isLoading: false,
    });
    (useSaveLocationQuery as jest.Mock).mockReturnValue({
      refetch: mockRefetchSaveLocationQuery,
    });
  });

  it('matches HistoricalPage component snapshot', () => {
    const component = renderWithQueryClient(<HistoricalPage />);
    expect(component.container).toMatchSnapshot();
  });

  it('renders error message when there is an error', () => {
    (useHistoricalDataQuery as jest.Mock).mockReturnValue({
      data: null,
      error: true,
      isLoading: false,
    });

    renderWithQueryClient(<HistoricalPage />);

    const errorMessage = screen.getByText('Error fetching historical data.');
    expect(errorMessage).toBeInTheDocument();
  });

  it('renders weather card when data is available', () => {
    renderWithQueryClient(<HistoricalPage />);

    const weatherCard = screen.getByTestId('historicalWeatherCard');
    expect(weatherCard).toBeInTheDocument();
  });

  it('handles Save button click in ActionsMenu', async () => {
    renderWithQueryClient(<HistoricalPage />);

    const actionsButton = screen.getByTestId('actionsButton');
    expect(actionsButton).toBeInTheDocument();

    fireEvent.click(actionsButton);

    const saveButton = screen.getByTestId('saveMenuItem');
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(mockRefetchSaveLocationQuery).toHaveBeenCalled();
    });
  });

  it('handles Export button click in ActionsMenu', async () => {
    renderWithQueryClient(<HistoricalPage />);

    const actionsButton = screen.getByTestId('actionsButton');
    fireEvent.click(actionsButton);

    const exportButton = screen.getByTestId('exportMenuItem');
    fireEvent.click(exportButton);

    await waitFor(() => {
      expect(mockExportCSV).toHaveBeenCalled();
    });
  });

  it('handles Reset button click in ActionsMenu', () => {
    const component = renderWithQueryClient(<HistoricalPage />);

    const actionsButton = screen.getByTestId('actionsButton');
    fireEvent.click(actionsButton);

    const resetButton = screen.getByTestId('resetMenuItem');
    fireEvent.click(resetButton);

    expect(component.container).toMatchSnapshot();
  });

  it('renders DataMap with correct data', () => {
    renderWithQueryClient(<HistoricalPage />);

    const dataMap = screen.getByTestId('dataMap');
    expect(dataMap).toBeInTheDocument();
  });

  it('renders DataTable with correct data', () => {
    renderWithQueryClient(<HistoricalPage />);

    const dataTable = screen.getByTestId('dataTable');
    expect(dataTable).toBeInTheDocument();
  });
});