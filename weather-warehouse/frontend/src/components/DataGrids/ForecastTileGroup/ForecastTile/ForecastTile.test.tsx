import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import React from 'react';
import { renderWithQueryClient } from '../../../../utils/test/renderWithQueryClient';
import ForecastPage from './ForecastTile';

jest.mock('react-leaflet', () => ({
  MapContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="dataMapContainer">{children}</div>
  ),
}));


describe.only('DataGrids/ForecastTileGroup/ForecastTile', () => {
  const renderComponent = (dayName: string) => {
    return renderWithQueryClient(<ForecastPage dayName={dayName} />);
  };

  it('matches ForecastTile component snapshot', () => {
    const component = renderComponent('Monday');
    expect(component).toMatchSnapshot();
  });

  it('renders the correct day name', () => {
    renderComponent('Tuesday');
    const forecastTile = screen.getByTestId('forecastTile');
    expect(forecastTile).toBeInTheDocument();
    expect(forecastTile).toHaveTextContent('Tuesday');
  });
});