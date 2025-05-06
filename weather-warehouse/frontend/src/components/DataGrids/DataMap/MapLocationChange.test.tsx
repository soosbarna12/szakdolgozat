import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React from 'react';
import { MapLocationChange } from './MapLocationChange';

// Create a custom mock for `react-leaflet`
const mockSetView = jest.fn();
jest.mock('react-leaflet', () => ({
    useMap: jest.fn(() => ({
        setView: mockSetView,
    })),
}));

describe('DataGrids/MapLocationChange', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    const renderComponent = (coords: [number, number]) => {
        return render(<MapLocationChange coords={coords} />);
    };

    it('matches MapLocationChange component snapshot', () => {
        const component = renderComponent([40.7128, -74.006]);
        expect(component).toMatchSnapshot();
    });

    it('calls map.setView with the correct coordinates', () => {
        const coords: [number, number] = [40.7128, -74.006];
        renderComponent(coords);

        expect(mockSetView).toHaveBeenCalledWith(coords, 10);
        expect(mockSetView).toHaveBeenCalledTimes(1);
    });

    it('updates map view when coordinates change', () => {
        const { rerender } = renderComponent([40.7128, -74.006]);
        expect(mockSetView).toHaveBeenCalledWith([40.7128, -74.006], 10);

        rerender(<MapLocationChange coords={[34.0522, -118.2437]} />);
        expect(mockSetView).toHaveBeenCalledWith([34.0522, -118.2437], 10);
    });
});