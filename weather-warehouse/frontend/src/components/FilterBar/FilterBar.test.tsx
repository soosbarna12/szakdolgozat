import '@testing-library/jest-dom';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { HistoricalContext } from '../../contexts/HistoricalContext/HistoricalContext';
import { TodayContext } from '../../contexts/TodayContext/TodayContext';
import { useHistoricalDates } from '../../hooks/useHistoricalDates';
import { Pages } from '../../types/page.type';
import { renderWithQueryClient } from '../../utils/test/renderWithQueryClient';
import { FilterBar } from './FilterBar';


jest.mock('../../hooks/useHistoricalDates', () => ({
    useHistoricalDates: jest.fn(),
}));

describe('FilterBar/FilterBar', () => {
    const mockOnDateChange = jest.fn();
    const mockOnExportLocation = jest.fn();
    const mockOnSaveLocation = jest.fn();
    const mockOnResetLocation = jest.fn();
    const mockHistoricalDates = ['2023-01-01', '2023-01-02', '2023-01-03'];

    const historicalContextValue = {
        location: { name: 'Historical Location', lat: 40.7128, lon: -74.006 },
        setLocation: jest.fn(),
    };

    const todayContextValue = {
        location: { name: 'Today Location', lat: 34.0522, lon: -118.2437 },
        setLocation: jest.fn(),
    };

    const defaultProps = {
        type: Pages.Historical,
        onDateChange: mockOnDateChange,
        onExportLocation: mockOnExportLocation,
        onSaveLocation: mockOnSaveLocation,
        onResetLocation: mockOnResetLocation,
    };

    beforeEach(() => {
        jest.clearAllMocks();
        (useHistoricalDates as jest.Mock).mockImplementation(() => ({
            data: mockHistoricalDates,
            isLoading: false,
        }));

        // Mock localStorage
        Object.defineProperty(window, 'localStorage', {
            value: {
                getItem: jest.fn((key) => {
                    if (key === 'token') {
                        return "23456134123";
                    }
                    return null;
                }),
                setItem: jest.fn(),
            },
            writable: true,
        });
    });

    function renderWithHistoricalContext() {
        return renderWithQueryClient(
            <HistoricalContext.Provider value={historicalContextValue as any}>
                <TodayContext.Provider value={todayContextValue}>
                    <FilterBar {...defaultProps as any} />
                </TodayContext.Provider>
            </HistoricalContext.Provider>
        );
    }

    function renderWithTodayContext() {
        return renderWithQueryClient(
            <HistoricalContext.Provider value={historicalContextValue as any}>
                <TodayContext.Provider value={todayContextValue}>
                    <FilterBar {...defaultProps as any} type={Pages.Today} />
                </TodayContext.Provider>
            </HistoricalContext.Provider>
        );
    }

    it('matches FilterBar component snapshot', () => {
        const component = renderWithHistoricalContext();
        expect(component).toMatchSnapshot();
    });

    it('renders historical filter bar when type is Historical', () => {
        renderWithHistoricalContext();

        expect(screen.getByTestId('locationSearchBox')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Date')).toBeInTheDocument();
        expect(screen.getByTestId('actionsButton')).toBeInTheDocument();
    });

    it('renders today filter bar when type is Today', () => {
        renderWithTodayContext();

        expect(screen.getByTestId('locationSearchBox')).toBeInTheDocument();
        expect(screen.queryByPlaceholderText('Date')).not.toBeInTheDocument();
        expect(screen.queryByTestId('actionsButton')).not.toBeInTheDocument();
    });

    it('calls onSaveLocation when save button is clicked', async () => {
        renderWithHistoricalContext();

        const actionsButton = screen.getByTestId('actionsButton');
        fireEvent.click(actionsButton);
    
        // Verify that the ActionsMenu is rendered
        const saveButton = await screen.findByTestId('saveMenuItem');
        fireEvent.click(saveButton);

        await waitFor(() => {
            expect(mockOnSaveLocation).toHaveBeenCalled();
        });
    });

    it('calls onExportLocation when export button is clicked', async () => {
        renderWithHistoricalContext();

        const actionsButton = screen.getByTestId('actionsButton');
        fireEvent.click(actionsButton);
    
        // Verify that the ActionsMenu is rendered
        const exportButton = await screen.findByTestId('exportMenuItem');
        fireEvent.click(exportButton);

        await waitFor(() => {
            expect(mockOnExportLocation).toHaveBeenCalled();
        });
    });

    it('calls onResetLocation when reset button is clicked', async () => {
        renderWithHistoricalContext();

        const actionsButton = screen.getByTestId('actionsButton');
        fireEvent.click(actionsButton);
    
        // Verify that the ActionsMenu is rendered
        const resetButton = await screen.findByTestId('resetMenuItem');
        fireEvent.click(resetButton);

        await waitFor(() => {
            expect(mockOnResetLocation).toHaveBeenCalled();
        });
    });
});