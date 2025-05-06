import '@testing-library/jest-dom';
import { fireEvent, screen } from '@testing-library/react';
import React from 'react';
import { HistoricalContext } from '../../../../contexts/HistoricalContext/HistoricalContext';
import { renderWithQueryClient } from '../../../../utils/test/renderWithQueryClient';
import { ActionsMenu } from './ActionsMenu';

describe('FilterBar/Actions/ActionsMenu', () => {
    const mockHandleCloseMenu = jest.fn();
    const mockOnSaveLocation = jest.fn();
    const mockOnExportLocation = jest.fn();
    const mockOnResetLocation = jest.fn();

    const renderComponent = (historicalPageData: any[] = [], anchorElUser: HTMLElement | null = document.createElement('div')) => {
        return renderWithQueryClient(
            <HistoricalContext.Provider value={{ historicalPageData } as any}>
                <ActionsMenu
                    anchorElUser={anchorElUser}
                    handleCloseMenu={mockHandleCloseMenu}
                    onSaveLocation={mockOnSaveLocation}
                    onExportLocation={mockOnExportLocation}
                    onResetLocation={mockOnResetLocation}
                />
            </HistoricalContext.Provider>
        );
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('matches ActionsMenu component snapshot', () => {
        const component = renderComponent();
        expect(component).toMatchSnapshot();
    });

    it('renders menu items and handles Save button click', () => {
        renderComponent([{ id: 1 }]); // Simulate historicalPageData with one item

        const saveButton = screen.getByTestId('saveMenuItem');
        expect(saveButton).not.toBeDisabled();

        fireEvent.click(saveButton);

        expect(mockOnSaveLocation).toHaveBeenCalled();
        expect(mockHandleCloseMenu).toHaveBeenCalledWith(null);
    });

    it('handles Export button click', () => {
        renderComponent([{ id: 1 }]); // Simulate historicalPageData with one item

        const exportButton = screen.getByTestId('exportMenuItem');
        expect(exportButton).not.toBeDisabled();

        fireEvent.click(exportButton);

        expect(mockOnExportLocation).toHaveBeenCalled();
        expect(mockHandleCloseMenu).toHaveBeenCalledWith(null);
    });

    it('handles Reset button click', () => {
        renderComponent([{ id: 1 }]); // Simulate historicalPageData with one item

        const resetButton = screen.getByTestId('resetMenuItem');
        expect(resetButton).not.toBeDisabled();

        fireEvent.click(resetButton);

        expect(mockOnResetLocation).toHaveBeenCalled();
        expect(mockHandleCloseMenu).toHaveBeenCalledWith(null);
    });

    it('disables menu items when historicalPageData is empty', () => {
        renderComponent([]); // Simulate empty historicalPageData

        const saveButton = screen.getByTestId('saveMenuItem');
        const exportButton = screen.getByTestId('exportMenuItem');
        const resetButton = screen.getByTestId('resetMenuItem');

        expect(saveButton).toHaveAttribute('aria-disabled', 'true');
        expect(exportButton).toHaveAttribute('aria-disabled', 'true');
        expect(resetButton).toHaveAttribute('aria-disabled', 'true');
    });

    it('does not render menu when anchorElUser is null', () => {
        renderComponent([], null); // Simulate no anchor element

        expect(screen.queryByTestId('actionsMenu')).not.toBeInTheDocument();
    });
});