import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import React from 'react';
import { renderWithQueryClient } from '../../../utils/test/renderWithQueryClient';
import ForecastTileGroup from './ForecastTileGroup';

jest.mock('react-leaflet', () => ({
    MapContainer: ({ children }: { children: React.ReactNode }) => (
        <div data-testid="dataMapContainer">{children}</div>
    ),
}));

describe('DataGrids/ForecastTileGroup', () => {
    it('matches ForecastTileGroup component snapshot', () => {
        const component = renderWithQueryClient(<ForecastTileGroup />);
        expect(component).toMatchSnapshot();
    });

    it('renders all forecast tiles with correct day names', () => {
        renderWithQueryClient(<ForecastTileGroup />);

        const forecastTiles = screen.getAllByTestId('forecastTile');
        expect(forecastTiles).toHaveLength(7); // Assuming there are 7 days in DAYS
    });
});