import '@testing-library/jest-dom';
import { renderHook } from '@testing-library/react';
import { useMapCoordinates } from './useMapCoordinates';

describe('DataGrids/useMapCoordinates', () => {
    it('matches useMapCoordinates hook snapshot', () => {
        const { result } = renderHook(() => useMapCoordinates(null));
        expect(result.current).toMatchSnapshot();
    });

    it('returns default coordinates when no data is provided', () => {
        const { result } = renderHook(() => useMapCoordinates(null));
        expect(result.current).toEqual([51.505, -0.09]);
    });

    it('returns updated coordinates when valid data is provided', () => {
        const mockData = { coord: { lat: 40.7128, lon: -74.006 } };
        const { result } = renderHook(() => useMapCoordinates(mockData));
        expect(result.current).toEqual([40.7128, -74.006]);
    });

    it('updates coordinates when data changes', () => {
        const initialData = { coord: { lat: 40.7128, lon: -74.006 } };
        const updatedData = { coord: { lat: 34.0522, lon: -118.2437 } };

        const { result, rerender } = renderHook(({ data }) => useMapCoordinates(data), {
            initialProps: { data: initialData },
        });

        expect(result.current).toEqual([40.7128, -74.006]);

        rerender({ data: updatedData });
        expect(result.current).toEqual([34.0522, -118.2437]);
    });
});