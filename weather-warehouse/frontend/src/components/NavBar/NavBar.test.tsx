import '@testing-library/jest-dom';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { renderWithQueryClient } from '../../utils/test/renderWithQueryClient';
import { NavBar } from './NavBar';

jest.mock('./LocationSelector/LocationButton/LocationButton', () => ({
    LocationButton: (props: any) => <div data-testid="locationButton" {...props}>LocationButton</div>,
}));

jest.mock('./TimeTabBar/TimeTabBar', () => ({
    TimeTabBar: (props: any) => <div data-testid="timeTabBar" {...props}>TimeTabBar</div>,
}));

jest.mock('./ProfileSettings/ProfileButton/ProfileButton', () => ({
    ProfileButton: ({ isLightTheme, handleSetLightTheme, ...props }: any) => (
        <div data-testid="profileButton" {...props}>
            <button data-testid="toggleThemeButton" onClick={handleSetLightTheme}>
                Toggle Theme
            </button>
            <span>{isLightTheme ? 'Light Theme' : 'Dark Theme'}</span>
        </div>
    ),
}));

describe('NavBar/NavBar', () => {
    const mockHandleSetLightTheme = jest.fn();

    const renderComponent = (isLightTheme = true) => {
        return renderWithQueryClient(
            <NavBar isLightTheme={isLightTheme} handleSetLightTheme={mockHandleSetLightTheme} />
        );
    };

    it('matches NavBar component snapshot', () => {
        const component = renderComponent();
        expect(component).toMatchSnapshot();
    });

    it('toggles the theme when the toggle button is clicked', async () => {
        renderComponent();

        const toggleButton = screen.getByTestId('toggleThemeButton');
        expect(toggleButton).toBeInTheDocument();

        fireEvent.click(toggleButton);

        await waitFor(() => {
            expect(mockHandleSetLightTheme).toHaveBeenCalled();
        });
    });
});