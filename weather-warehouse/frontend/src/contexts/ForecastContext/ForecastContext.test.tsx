import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import React, { useContext } from 'react';
import { ForecastContext, ForecastLocationProvider } from './ForecastContext';

describe('contexts/ForecastContext', () => {
  const mockChildren = <div data-testid="mockChildren">Mock Children</div>;

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('matches ForecastLocationProvider component snapshot', () => {
    const { container } = render(
      <ForecastLocationProvider>{mockChildren}</ForecastLocationProvider>
    );
    expect(container).toMatchSnapshot();
  });

  it('provides default values when localStorage is empty', () => {
    render(
      <ForecastLocationProvider>{mockChildren}</ForecastLocationProvider>
    );

    const defaultLocation = { name: '', lat: 0, lon: 0 };
    expect(localStorage.getItem('forecastLocation')).toEqual(
      JSON.stringify(defaultLocation)
    );

    const context = screen.getByTestId('mockChildren').closest('div');
    expect(context).toBeInTheDocument();
  });

  it('loads values from localStorage when available', () => {
    const mockLocation = { name: 'New York', lat: 40.7128, lon: -74.006 };
    localStorage.setItem('forecastLocation', JSON.stringify(mockLocation));

    render(
      <ForecastLocationProvider>{mockChildren}</ForecastLocationProvider>
    );

    expect(localStorage.getItem('forecastLocation')).toEqual(JSON.stringify(mockLocation));
  });

  it('updates localStorage when location changes', () => {
    const TestComponent = () => {
      const { location, setLocation } = useContext(ForecastContext);

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
      <ForecastLocationProvider>
        <TestComponent />
      </ForecastLocationProvider>
    );

    const updateButton = screen.getByTestId('updateLocationButton');
    fireEvent.click(updateButton);

    expect(localStorage.getItem('forecastLocation')).toEqual(
      JSON.stringify({ name: 'Los Angeles', lat: 34.0522, lon: -118.2437 })
    );
    expect(screen.getByTestId('locationName').textContent).toBe('Los Angeles');
  });

  it('handles invalid JSON in localStorage gracefully', () => {
    localStorage.setItem('forecastLocation', 'invalid-json');

    render(
      <ForecastLocationProvider>{mockChildren}</ForecastLocationProvider>
    );

    const defaultLocation = { name: '', lat: 0, lon: 0 };
    expect(localStorage.getItem('forecastLocation')).toEqual(
      JSON.stringify(defaultLocation)
    );
  });
});