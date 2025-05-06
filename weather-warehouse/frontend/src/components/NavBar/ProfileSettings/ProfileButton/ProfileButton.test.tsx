import '@testing-library/jest-dom';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { renderWithQueryClient } from '../../../../utils/test/renderWithQueryClient';
import { ProfileButton } from './ProfileButton';

jest.mock('../ProfileMenu/ProfileMenu', () => ({
  ProfileMenu: ({

    handleSetLightTheme,
    handleCloseMenu,
    anchorElUser,
  }: {
    isLightTheme: boolean;
    handleSetLightTheme: () => void;
    handleCloseMenu: () => void;
    anchorElUser: HTMLElement | null;
  }) => (
    <div data-testid="profileMenu">
      {anchorElUser && (
        <div>
          <button data-testid="toggleThemeButton" onClick={handleSetLightTheme}>
            Toggle Theme
          </button>
          <button data-testid="closeMenuButton" onClick={handleCloseMenu}>
            Close Menu
          </button>
        </div>
      )}
    </div>
  ),
}));

describe('NavBar/ProfileSettings/ProfileButton', () => {
  const mockHandleSetLightTheme = jest.fn();

  const renderComponent = (isLightTheme = true) => {
    return renderWithQueryClient(
      <ProfileButton
        isLightTheme={isLightTheme}
        handleSetLightTheme={mockHandleSetLightTheme}
      />
    );
  };

  it('matches ProfileButton component snapshot', () => {
    const component = renderComponent();
    expect(component).toMatchSnapshot();
  });

  it('renders the ProfileButton and opens the ProfileMenu on click', async () => {
    renderComponent();

    // Verify the button is rendered
    const profileButton = screen.getByRole('button', { name: /open settings/i });
    expect(profileButton).toBeInTheDocument();

    // Click the button to open the menu
    fireEvent.click(profileButton);

    // Verify the menu is open
    await waitFor(() => {
      expect(screen.getByTestId('profileMenu')).toBeInTheDocument();
    });
  });

  it('calls handleSetLightTheme when the toggle theme button is clicked', async () => {
    renderComponent();

    // Open the menu
    const profileButton = screen.getByRole('button', { name: /open settings/i });
    fireEvent.click(profileButton);

    // Click the toggle theme button
    const toggleThemeButton = await screen.findByTestId('toggleThemeButton');
    fireEvent.click(toggleThemeButton);

    // Verify the toggle theme function is called
    expect(mockHandleSetLightTheme).toHaveBeenCalled();
  });
});