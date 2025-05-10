import '@testing-library/jest-dom';
import { screen, waitFor } from '@testing-library/react';
import React from 'react';
import { ForecastPage } from './ForecastPage';
import { ForecastContext } from '../../contexts/ForecastContext/ForecastContext';
import { useLSTMForecast } from '../../hooks/useLSTMForecast';
import { renderWithQueryClient } from '../../utils/test/renderWithQueryClient';

jest.mock('../../hooks/useLSTMForecast', () => ({
  useLSTMForecast: jest.fn(),
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

describe('pages/ForecastPage', () => {
  const mockLocation = { name: 'Budapest', lat: 47.4979, lon: 19.0402 };

  const renderForecastPage = () =>
    renderWithQueryClient(
      <ForecastContext.Provider value={{ location: mockLocation, setLocation: jest.fn() }}>
        <ForecastPage />
      </ForecastContext.Provider>
    );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('matches ForecastPage component snapshot', () => {
    (useLSTMForecast as jest.Mock).mockReturnValue({
      data: null,
      error: null,
      isLoading: true,
    });

    const { container } = renderForecastPage();
    expect(container).toMatchSnapshot();
  });

  it('renders skeletons when loading', () => {
    (useLSTMForecast as jest.Mock).mockReturnValue({
      data: null,
      error: null,
      isLoading: true,
    });

    renderForecastPage();

    const skeletons = screen.getAllByTestId('forecastTileSkeleton');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it('renders forecast tiles when data is available', async () => {
    const mockForecastData = [
      { date: '2025-05-08', temperature: 22.5 },
      { date: '2025-05-09', temperature: 24.0 },
    ];

    (useLSTMForecast as jest.Mock).mockReturnValue({
      data: mockForecastData,
      error: null,
      isLoading: false,
    });

    renderForecastPage();

    await waitFor(() => {
      const forecastTiles = screen.getAllByTestId('forecastTile');
      expect(forecastTiles.length).toBe(mockForecastData.length);
    });
  });
});