import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { ForecastTile } from './ForecastTile';
import { TemperatureScale } from '../../../../types/temperatureScale.type';
import { HistoricalContext } from '../../../../contexts/HistoricalContext/HistoricalContext';

jest.mock('react-leaflet', () => ({
  MapContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="dataMapContainer">{children}</div>
  ),
  TileLayer: () => <div data-testid="mockTileLayer">Mock TileLayer</div>,
  useMap: jest.fn(() => ({
    setView: jest.fn(),
  })),
}));


describe('DataGrids/ForecastTileGroup/ForecastTile', () => {
  const props = { data: { date: '2025-05-08', temperature: 22.5, precipitation: 0.5, pressure: 1013 }, isLoading: false };

  const renderComponent = (props: any, temperatureScale = TemperatureScale.Celsius) => {
    return render(
      <HistoricalContext.Provider value={{ temperatureScale } as any}>
        <ForecastTile {...props} />
      </HistoricalContext.Provider>
    );
  };

  it('matches ForecastTile component snapshot', () => {
    const component = renderComponent(props);
    expect(component).toMatchSnapshot();
  });

  it('renders the correct day name and date', () => {
    renderComponent(props);
    expect(screen.getByTestId('dayName')).toHaveTextContent('Thursday');
    expect(screen.getByTestId('date')).toHaveTextContent('May 8');
  });

  it('renders the correct temperature in Celsius', () => {
    renderComponent(props, TemperatureScale.Celsius);
    expect(screen.getByTestId('temperature')).toHaveTextContent('22.5°C');
  });

  it('renders the correct temperature in Fahrenheit', () => {
    renderComponent(props, TemperatureScale.Fahrenheit);
    expect(screen.getByTestId('temperature')).toHaveTextContent('73°F'); // Assuming conversion is correct
  });
});