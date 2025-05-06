import '@testing-library/jest-dom';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { useGeolocationQuery } from '../../../hooks/useGeolocationQuery';
import { Pages } from '../../../types/page.type';
import { renderWithQueryClient } from '../../../utils/test/renderWithQueryClient';
import { LocationSearch } from './LocationSearch';


jest.mock('../../../hooks/useGeolocationQuery', () => ({
    useGeolocationQuery: jest.fn(() => ({
        data: [],
        error: null,
        isLoading: false,
    })),
}));

jest.mock('../../../hooks/useHistoricalLocations', () => ({
    useHistoricalLocations: jest.fn(() => ({
        data: [],
        error: null,
        isLoading: false,
    })),
}));

describe('FilterBar/LocationSearch', () => {
    const mockSetLocation = jest.fn();

    const defaultProps = {
        type: Pages.Today,
        location: { name: 'New York', country: 'US', state: 'NY', lat: 40.7128, lon: -74.006 },
        setLocation: mockSetLocation,
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('matches LocationSearch component snapshot', () => {
        const component = renderWithQueryClient(<LocationSearch {...defaultProps} />);
        expect(component).toMatchSnapshot();
    });

    it('renders the correct placeholder based on page type', () => {
        renderWithQueryClient(<LocationSearch {...defaultProps} />);
        const input = screen.getByPlaceholderText('New York');
        expect(input).toBeInTheDocument();
    });

    it('displays "Loading locations..." when isLoading is true', () => {
        (useGeolocationQuery as jest.Mock).mockReturnValueOnce({
            data: [],
            error: null,
            isLoading: true,
        });

        renderWithQueryClient(<LocationSearch {...defaultProps} />);

        waitFor(() => {
            expect(screen.getByText('Loading locations...')).toBeInTheDocument();

        });
    });

    it('displays "Failed to load locations" when there is an error', () => {
        (useGeolocationQuery as jest.Mock).mockReturnValueOnce({
            data: [],
            error: true,
            isLoading: false,
        });

        renderWithQueryClient(<LocationSearch {...defaultProps} />);
        waitFor(() => {
            expect(screen.getByText('Failed to load locations')).toBeInTheDocument();

        });
    });

    it('updates input value when typing', () => {
        renderWithQueryClient(<LocationSearch {...defaultProps} />);
        const input = screen.getByTestId('locationSearchBox').querySelector('input');
        fireEvent.change(input!, { target: { value: 'Los Angeles' } });
        expect(input).toHaveValue('Los Angeles');
    });

    it('calls setLocation with empty values when input is cleared', () => {
        renderWithQueryClient(<LocationSearch {...defaultProps} />);
        const input = screen.getByTestId('locationSearchBox').querySelector('input');
        fireEvent.change(input!, { target: { value: '' } });
        expect(mockSetLocation).toHaveBeenCalledWith({ name: '', lat: 0, lon: 0 });
    });

    it('calls setLocation with selected location when an option is selected', async () => {
        (useGeolocationQuery as jest.Mock).mockReturnValueOnce({
            data: [
                { name: 'Los Angeles', country: 'US', state: 'CA', lat: 34.0522, lon: -118.2437 },
            ],
            error: null,
            isLoading: false,
        });

        renderWithQueryClient(<LocationSearch {...defaultProps} />);
        const input = screen.getByTestId('locationSearchBox').querySelector('input');
        fireEvent.change(input!, { target: { value: 'Los Angeles' } });

        await waitFor(() => {
            const option = screen.getByText('Los Angeles, CA, US');
            fireEvent.click(option);
        });

        expect(mockSetLocation).toHaveBeenCalledWith({
            name: 'Los Angeles',
            country: 'US',
            state: 'CA',
            lat: 34.0522,
            lon: -118.2437,
        });
    });

    it('displays "No location found" when no options are available', () => {
        (useGeolocationQuery as jest.Mock).mockReturnValueOnce({
            data: [],
            error: null,
            isLoading: false,
        });

        renderWithQueryClient(<LocationSearch {...defaultProps} />);
        waitFor(() => {
            expect(screen.getByText('No location found')).toBeInTheDocument();

        });
    });
});