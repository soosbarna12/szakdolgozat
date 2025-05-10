import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import React from 'react';
import { TodayContext } from '../../contexts/TodayContext/TodayContext';
import { renderWithQueryClient } from '../../utils/test/renderWithQueryClient';
import { TodayPage } from './TodayPage';
import { useTodayDataQuery } from '../../hooks/useTodayDataQuery';

jest.mock('../../hooks/useTodayDataQuery', () => ({
  useTodayDataQuery: jest.fn(),
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

describe('pages/TodayPage', () => {
  const mockLocation = { name: 'New York', lat: 40.7128, lon: -74.006 };
  const mockTodayData = {
    name: 'New York',
    sys: { country: 'US' },
    dt: 1633036800,
    weather: [{ main: 'Clear', description: 'clear sky' }],
    main: { temp: 25, humidity: 60 },
    wind: { speed: 5 },
  };
  const mockError = 'Error fetching data';

  const renderTodayPage = () =>
    renderWithQueryClient(
      <TodayContext.Provider value={{ location: mockLocation } as any}>
        <TodayPage />
      </TodayContext.Provider>
    );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('matches TodayPage component snapshot', () => {
    (useTodayDataQuery as jest.Mock).mockReturnValue({
      data: mockTodayData,
      error: null,
      isLoading: false,
    });

    const { container } = renderTodayPage();
    expect(container).toMatchSnapshot();
  });

  it('renders shimmer when loading', () => {
    (useTodayDataQuery as jest.Mock).mockReturnValue({
      data: null,
      error: null,
      isLoading: true,
    });

    renderTodayPage();

    const shimmer = screen.getByTestId('todaySkeleton');
    expect(shimmer).toBeInTheDocument();
  });

  it('renders error message when there is an error', () => {
    (useTodayDataQuery as jest.Mock).mockReturnValue({
      data: null,
      error: mockError,
      isLoading: false,
    });

    renderTodayPage();

    const errorMessage = screen.getByText('Error fetching data.');
    expect(errorMessage).toBeInTheDocument();
  });

  it('renders weather card when data is available', () => {
    (useTodayDataQuery as jest.Mock).mockReturnValue({
      data: mockTodayData,
      error: null,
      isLoading: false,
    });

    renderTodayPage();

    const weatherCard = screen.getByTestId('todayWeatherCard');
    expect(weatherCard).toBeInTheDocument();
  });

  it('handles null data gracefully', () => {
    (useTodayDataQuery as jest.Mock).mockReturnValue({
      data: null,
      error: null,
      isLoading: false,
    });

    renderTodayPage();

    const weatherCard = screen.queryByTestId('todayWeatherCard');
    expect(weatherCard).toBeNull();
  });
});