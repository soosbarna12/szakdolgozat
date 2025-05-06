import '@testing-library/jest-dom';
import { waitFor } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { TodayContext } from '../contexts/TodayContext/TodayContext';
import { useUserDefaultLocationQuery } from '../hooks/useUserDefaultLocationQuery';
import { renderWithQueryClient } from '../utils/test/renderWithQueryClient';
import { BaseComponent } from './BaseComponent';

jest.mock('../hooks/useGeolocationQuery', () => ({
  useGeolocationQuery: jest.fn(() => ({
    data: [],
    error: null,
    isLoading: false,
  })),
}));

jest.mock('../hooks/useUserDefaultLocationQuery', () => ({
  useUserDefaultLocationQuery: jest.fn(() => ({
    data: null,
    error: null,
    isLoading: false,
  })),
}));

jest.mock('react-leaflet', () => ({
  MapContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="dataMapContainer">{children}</div>
  )
}));

jest.mock('export-to-csv', () => ({
  download: jest.fn(),
  generateCsv: jest.fn(),
  mkConfig: jest.fn(),
}));

describe('BaseComponent', () => {
  const mockSetLocation = jest.fn();
  const mockGetCurrentPosition = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useUserDefaultLocationQuery as jest.Mock).mockReturnValue({ data: null });

    Object.defineProperty(global.navigator, 'geolocation', {
      value: {
        getCurrentPosition: mockGetCurrentPosition,
      },
      writable: true,
    });
  });

  const renderComponent = (location = { name: "Budapest", country: "HU", lat: 0, lon: 0 }) => {
    return renderWithQueryClient(
      <MemoryRouter>
        <TodayContext.Provider value={{ location, setLocation: mockSetLocation }}>
          <BaseComponent />
        </TodayContext.Provider>
      </MemoryRouter>
    );
  };

  it('matches BaseComponent snapshot', () => {
    const component = renderComponent();
    expect(component).toMatchSnapshot();
  });

  it('calls geolocation API when location is not set', async () => {
    mockGetCurrentPosition.mockImplementationOnce((successCallback) => {
      successCallback({ coords: { latitude: 40.7128, longitude: -74.006 } });
    });

    renderComponent({ name: null, country: null, lat: 0, lon: 0 });

    await waitFor(() => {
      expect(mockGetCurrentPosition).toHaveBeenCalled();
    });
  });
});