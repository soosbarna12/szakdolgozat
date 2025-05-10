import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import React from 'react';
import { renderWithQueryClient } from '../../../utils/test/renderWithQueryClient';
import { DataMap } from './DataMap';

// eslint-disable-next-line @typescript-eslint/no-require-imports
global.ResizeObserver = require("resize-observer-polyfill");

jest.mock('react-leaflet', () => ({
    MapContainer: ({ children }: { children: React.ReactNode }) => (
        <div data-testid="dataMapContainer">{children}</div>
    ),
    TileLayer: () => <div data-testid="mockTileLayer">Mock TileLayer</div>,
}));

jest.mock('./MapLocationChange', () => ({
    MapLocationChange: ({ coords }: { coords: [number, number] }) => (
        <div data-testid="mockMapLocationChange">Mock MapLocationChange: {coords.join(', ')}</div>
    ),
}));

describe('DataGrids/DataMap', () => {
    const mockData = { lat: 40.7128, lon: -74.006 };

    beforeAll(() => {
        global.ResizeObserver = class {
            observe() { }
            unobserve() { }
            disconnect() { }
        };
    });

    const renderComponent = (data = mockData) => {
        return renderWithQueryClient(<DataMap data={data} />);
    };

    it('matches DataMap component snapshot', () => {
        const component = renderComponent();
        expect(component).toMatchSnapshot();
    });

    it('renders skeleton when data is not provided', () => {
        renderComponent(null);
        const skeleton = screen.getByTestId('dataMapSkeleton');
        expect(skeleton).toBeInTheDocument();
    });
});