import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import React, { useContext } from 'react';
import { HistoricalContext, HistoricalLocationProvider } from './HistoricalContext';

describe('contexts/HistoricalContext', () => {
  const mockChildren = <div data-testid="mockChildren">Mock Children</div>;

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('matches HistoricalLocationProvider component snapshot', () => {
    const { container } = render(
      <HistoricalLocationProvider>{mockChildren}</HistoricalLocationProvider>
    );
    expect(container).toMatchSnapshot();
  });

  it('provides default values when localStorage is empty', () => {
    render(
      <HistoricalLocationProvider>{mockChildren}</HistoricalLocationProvider>
    );

    const defaultLocation = { name: '', lat: 0, lon: 0 };
    const defaultPageData = [];
    const defaultTemperatureScale = 'celsius'; // Updated to lowercase

    expect(localStorage.getItem('historicalLocation')).toEqual(
      JSON.stringify(defaultLocation)
    );
    expect(localStorage.getItem('historicalPageData')).toEqual(
      JSON.stringify(defaultPageData)
    );
    expect(localStorage.getItem('temperatureScale')).toEqual(
      JSON.stringify(defaultTemperatureScale)
    );
  });

  it('loads values from localStorage when available', () => {
    const mockLocation = { name: 'New York', lat: 40.7128, lon: -74.006 };
    const mockPageData = [{ date: '2023-01-01', temperature: 5 }];
    const mockTemperatureScale = 'Fahrenheit';

    localStorage.setItem('historicalLocation', JSON.stringify(mockLocation));
    localStorage.setItem('historicalPageData', JSON.stringify(mockPageData));
    localStorage.setItem('temperatureScale', JSON.stringify(mockTemperatureScale));

    render(
      <HistoricalLocationProvider>{mockChildren}</HistoricalLocationProvider>
    );

    expect(localStorage.getItem('historicalLocation')).toEqual(JSON.stringify(mockLocation));
    expect(localStorage.getItem('historicalPageData')).toEqual(JSON.stringify(mockPageData));
    expect(localStorage.getItem('temperatureScale')).toEqual(JSON.stringify(mockTemperatureScale));
  });

  it('updates localStorage when location changes', () => {
    const TestComponent = () => {
      const { location, setLocation } = useContext(HistoricalContext);

      return (
        <div>
          <button
            data-testid="updateLocationButton"
            onClick={() => setLocation({ name: 'Los Angeles', lat: 34.0522, lon: -118.2437 })}
          >
            Update Location
          </button>
          <span data-testid="locationName">{location.name}</span>
        </div>
      );
    };

    render(
      <HistoricalLocationProvider>
        <TestComponent />
      </HistoricalLocationProvider>
    );

    const updateButton = screen.getByTestId('updateLocationButton');
    fireEvent.click(updateButton);

    expect(localStorage.getItem('historicalLocation')).toEqual(
      JSON.stringify({ name: 'Los Angeles', lat: 34.0522, lon: -118.2437 })
    );
    expect(screen.getByTestId('locationName').textContent).toBe('Los Angeles');
  });

  it('updates localStorage when historicalPageData changes', () => {
    const TestComponent = () => {
      const { historicalPageData, setHistoricalPageData } = useContext(HistoricalContext);

      return (
        <div>
          <button
            data-testid="updatePageDataButton"
            onClick={() => setHistoricalPageData([{ date: '2023-01-02', temp: 10 } as any])}
          >
            Update Page Data
          </button>
          <span data-testid="pageDataLength">{historicalPageData.length}</span>
        </div>
      );
    };

    render(
      <HistoricalLocationProvider>
        <TestComponent />
      </HistoricalLocationProvider>
    );

    const updateButton = screen.getByTestId('updatePageDataButton');
    fireEvent.click(updateButton);

    expect(localStorage.getItem('historicalPageData')).toEqual(
      JSON.stringify([{ date: '2023-01-02', temperature: 10 }])
    );
    expect(screen.getByTestId('pageDataLength').textContent).toBe('1');
  });

  it('updates localStorage when temperatureScale changes', () => {
    const TestComponent = () => {
      const { temperatureScale, setTemperatureScale } = useContext(HistoricalContext);

      return (
        <div>
          <button
            data-testid="updateTemperatureScaleButton"
            onClick={() => setTemperatureScale('Fahrenheit')}
          >
            Update Temperature Scale
          </button>
          <span data-testid="temperatureScale">{temperatureScale}</span>
        </div>
      );
    };

    render(
      <HistoricalLocationProvider>
        <TestComponent />
      </HistoricalLocationProvider>
    );

    const updateButton = screen.getByTestId('updateTemperatureScaleButton');
    fireEvent.click(updateButton);

    expect(localStorage.getItem('temperatureScale')).toEqual(JSON.stringify('Fahrenheit'));
    expect(screen.getByTestId('temperatureScale').textContent).toBe('Fahrenheit');
  });

  it('handles invalid JSON in localStorage gracefully', () => {
    localStorage.setItem('historicalLocation', 'invalid-json');
    localStorage.setItem('historicalPageData', 'invalid-json');
    localStorage.setItem('temperatureScale', 'invalid-json');

    render(
      <HistoricalLocationProvider>{mockChildren}</HistoricalLocationProvider>
    );

    const defaultLocation = { name: '', lat: 0, lon: 0 };
    const defaultPageData = [];
    const defaultTemperatureScale = 'celsius'; // Updated to lowercase

    expect(localStorage.getItem('historicalLocation')).toEqual(
      JSON.stringify(defaultLocation)
    );
    expect(localStorage.getItem('historicalPageData')).toEqual(
      JSON.stringify(defaultPageData)
    );
    expect(localStorage.getItem('temperatureScale')).toEqual(
      JSON.stringify(defaultTemperatureScale)
    );
  });
});