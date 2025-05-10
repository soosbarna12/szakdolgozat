import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import dayjs from 'dayjs';
import React from 'react';
import { HistoricalContext } from '../../../contexts/HistoricalContext/HistoricalContext';
import { useHistoricalDates } from '../../../hooks/useHistoricalDates';
import { renderWithQueryClient } from '../../../utils/test/renderWithQueryClient';
import { DateFilter } from './DateFilter';

jest.mock('../../../hooks/useHistoricalDates', () => ({
    useHistoricalDates: jest.fn(),
}));

describe('FilterBar/DateFilter', () => {
    const mockOnDateChange = jest.fn();
    const mockHistoricalDates = ['2023-01-01', '2023-01-02', '2023-01-03'];

    beforeEach(() => {
        jest.clearAllMocks();
        (useHistoricalDates as jest.Mock).mockImplementation(() => ({
            data: mockHistoricalDates,
            isLoading: false,
        }));

        Object.defineProperty(window, 'localStorage', {
            value: {
                getItem: jest.fn((key) => {
                    if (key === 'selectedDate') {
                        return null;
                    }
                    return null;
                }),
                setItem: jest.fn(),
            },
            writable: true,
        });
    });

    const renderComponent = (locationName = 'Test Location', selectedDate = null) => {
        window.localStorage.getItem = jest.fn(() =>
            selectedDate ? dayjs(selectedDate).format('YYYY-MM-DD') : null
        );

        return renderWithQueryClient(
            <HistoricalContext.Provider value={{ location: { name: locationName } as any } as any}>
                <DateFilter onDateChange={mockOnDateChange} />
            </HistoricalContext.Provider>
        );
    };

    it('matches DateFilter component snapshot', () => {
        const component = renderComponent();
        expect(component).toMatchSnapshot();
    });

    it('renders the date picker with the correct placeholder when no date is selected', () => {
        renderComponent();
        const datePicker = screen.getByPlaceholderText('Date');
        expect(datePicker).toHaveAttribute('placeholder', 'Date');
    });

    it('renders the date picker with the selected date', () => {
        renderComponent('Test Location', '2023-01-01');
        const datePicker = screen.getByPlaceholderText('2023-01-01');
        expect(datePicker).toHaveValue('2023-01-01');
    });

    it('disables the date picker when no location is selected', () => {
        renderComponent('');
        const datePicker = screen.getByPlaceholderText('Date');
        expect(datePicker).toBeDisabled();
    });

    it('disables dates not in historicalDates', () => {
        renderComponent();
        const datePicker = screen.getByPlaceholderText('Date');
        const enabledDate = dayjs('2023-01-01');

        expect(datePicker).toBeInTheDocument();
        expect(
            (useHistoricalDates as jest.Mock).mock.calls[0][0]
        ).toBe('Test Location');
        expect(mockHistoricalDates).toContain(enabledDate.format('YYYY-MM-DD'));
    });
});