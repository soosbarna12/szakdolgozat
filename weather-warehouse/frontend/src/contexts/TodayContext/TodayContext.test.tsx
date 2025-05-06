import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import React, { useContext } from 'react';
import { TodayContext, TodayLocationProvider } from './TodayContext';

describe('contexts/TodayContext', () => {
  const mockChildren = <div data-testid="mockChildren">Mock Children</div>;

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('matches TodayLocationProvider component snapshot', () => {
    const { container } = render(
      <TodayLocationProvider>{mockChildren}</TodayLocationProvider>
    );
    expect(container).toMatchSnapshot();
  });

  it('provides default values when localStorage is empty', () => {
    render(
      <TodayLocationProvider>{mockChildren}</TodayLocationProvider>
    );
  
    const defaultLocation = { name: '', lat: 0, lon: 0 };
    expect(localStorage.getItem('todayLocation')).toEqual(
      JSON.stringify(defaultLocation)
    );
  
    const context = screen.getByTestId('mockChildren').closest('div');
    expect(context).toBeInTheDocument();
  });

  it('loads values from localStorage when available', () => {
    const mockLocation = { name: 'New York', lat: 40.7128, lon: -74.006 };
    localStorage.setItem('todayLocation', JSON.stringify(mockLocation));

    render(
      <TodayLocationProvider>{mockChildren}</TodayLocationProvider>
    );

    expect(localStorage.getItem('todayLocation')).toEqual(JSON.stringify(mockLocation));
  });

  it('updates localStorage when location changes', () => {
    const TestComponent = () => {
      const { location, setLocation } = useContext(TodayContext);

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
      <TodayLocationProvider>
        <TestComponent />
      </TodayLocationProvider>
    );

    const updateButton = screen.getByTestId('updateLocationButton');
    fireEvent.click(updateButton);

    expect(localStorage.getItem('todayLocation')).toEqual(
      JSON.stringify({ name: 'Los Angeles', lat: 34.0522, lon: -118.2437 })
    );
    expect(screen.getByTestId('locationName').textContent).toBe('Los Angeles');
  });

  it('handles invalid JSON in localStorage gracefully', () => {
    localStorage.setItem('todayLocation', 'invalid-json');
  
    render(
      <TodayLocationProvider>{mockChildren}</TodayLocationProvider>
    );
  
    const defaultLocation = { name: '', lat: 0, lon: 0 };
    expect(localStorage.getItem('todayLocation')).toEqual(
      JSON.stringify(defaultLocation)
    );
  });
});