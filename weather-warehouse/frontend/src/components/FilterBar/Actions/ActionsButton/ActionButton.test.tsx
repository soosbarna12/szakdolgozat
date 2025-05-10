import '@testing-library/jest-dom';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { renderWithQueryClient } from '../../../../utils/test/renderWithQueryClient';
import { ActionsButton } from './ActionsButton';


jest.mock('../ActionsMenu/ActionsMenu', () => ({
    ActionsMenu: ({ handleCloseMenu, onSaveLocation, onExportLocation, onResetLocation }: any) => (
        <div data-testid="actionsMenu">
            <button data-testid="saveLocationButton" onClick={onSaveLocation}>Save Location</button>
            <button data-testid="exportLocationButton" onClick={onExportLocation}>Export Location</button>
            <button data-testid="resetLocationButton" onClick={onResetLocation}>Reset Location</button>
            <button data-testid="closeMenuButton" onClick={handleCloseMenu}>Close Menu</button>
        </div>
    ),
}));

jest.mock('../../../../stlyes/button.style', () => ({
    StyledMenuButton: ({ children, endIcon, ...props }: any) => (
        <button {...props} data-testid="styledMenuButton">
            {children}
            {endIcon && <span data-testid="endIcon">{endIcon}</span>}
        </button>
    ),
}));

describe('FilterBar/Actions/ActionsButton', () => {
    const mockOnSaveLocation = jest.fn();
    const mockOnExportLocation = jest.fn();
    const mockOnResetLocation = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        localStorage.setItem('token', 'mockToken');
    });

    afterEach(() => {
        localStorage.removeItem('token');
    });

    it('matches ActionsButton component snapshot', () => {
        const component = renderWithQueryClient(
            <ActionsButton
                onSaveLocation={mockOnSaveLocation}
                onExportLocation={mockOnExportLocation}
                onResetLocation={mockOnResetLocation}
            />
        );

        expect(component).toMatchSnapshot();
    });

    it('does not render anything when the user is not logged in', () => {
        localStorage.removeItem('token');

        renderWithQueryClient(
            <ActionsButton
                onSaveLocation={mockOnSaveLocation}
                onExportLocation={mockOnExportLocation}
                onResetLocation={mockOnResetLocation}
            />
        );

        expect(screen.queryByTestId('styledMenuButton')).not.toBeInTheDocument();
    });

    it('renders the menu button and opens the menu on click', () => {
        renderWithQueryClient(
            <ActionsButton
                onSaveLocation={mockOnSaveLocation}
                onExportLocation={mockOnExportLocation}
                onResetLocation={mockOnResetLocation}
            />
        );

        const menuButton = screen.getByTestId('styledMenuButton');
        fireEvent.click(menuButton);

        expect(screen.getByTestId('actionsMenu')).toBeInTheDocument();
    });

    it('calls onSaveLocation when the save location button is clicked', async () => {
        renderWithQueryClient(
            <ActionsButton
                onSaveLocation={mockOnSaveLocation}
                onExportLocation={mockOnExportLocation}
                onResetLocation={mockOnResetLocation}
            />
        );

        const menuButton = screen.getByTestId('styledMenuButton');
        fireEvent.click(menuButton);

        const saveButton = screen.getByTestId('saveLocationButton');
        fireEvent.click(saveButton);

        await waitFor(() => {
            expect(mockOnSaveLocation).toHaveBeenCalled();
        });
    });

    it('calls onExportLocation when the export location button is clicked', async () => {
        renderWithQueryClient(
            <ActionsButton
                onSaveLocation={mockOnSaveLocation}
                onExportLocation={mockOnExportLocation}
                onResetLocation={mockOnResetLocation}
            />
        );

        const menuButton = screen.getByTestId('styledMenuButton');
        fireEvent.click(menuButton);

        const exportButton = screen.getByTestId('exportLocationButton');
        fireEvent.click(exportButton);

        await waitFor(() => {
            expect(mockOnExportLocation).toHaveBeenCalled();
        });
    });

    it('calls onResetLocation when the reset location button is clicked', async () => {
        renderWithQueryClient(
            <ActionsButton
                onSaveLocation={mockOnSaveLocation}
                onExportLocation={mockOnExportLocation}
                onResetLocation={mockOnResetLocation}
            />
        );

        const menuButton = screen.getByTestId('styledMenuButton');
        fireEvent.click(menuButton);

        const resetButton = screen.getByTestId('resetLocationButton');
        fireEvent.click(resetButton);

        await waitFor(() => {
            expect(mockOnResetLocation).toHaveBeenCalled();
        });
    });

});