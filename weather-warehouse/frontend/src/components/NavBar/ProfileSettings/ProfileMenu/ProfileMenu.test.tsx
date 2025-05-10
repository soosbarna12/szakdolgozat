import '@testing-library/jest-dom';
import { fireEvent, screen } from '@testing-library/react';
import React from 'react';
import { HistoricalContext } from '../../../../contexts/HistoricalContext/HistoricalContext';
import { useLoginQuery } from '../../../../hooks/useLoginQuery';
import { renderWithQueryClient } from '../../../../utils/test/renderWithQueryClient';
import { ProfileMenu } from './ProfileMenu';

jest.mock('../../../../hooks/useLoginQuery', () => ({
  useLoginQuery: jest.fn(),
}));

jest.mock('../../../AuthenticationForms/LoginForm/LoginForm', () => ({
  LoginForm: ({ open, onClose, onLoginSuccess }: any) => (
    <div data-testid="loginForm">
      {open && (
        <div>
          <button data-testid="loginSuccessButton" onClick={onLoginSuccess}>
            Login Success
          </button>
          <button data-testid="closeLoginFormButton" onClick={onClose}>
            Close Login Form
          </button>
        </div>
      )}
    </div>
  ),
}));

describe('NavBar/ProfileSettings/ProfileMenu', () => {
  const mockHandleSetLightTheme = jest.fn();
  const mockHandleCloseMenu = jest.fn();
  const mockSetTemperatureScale = jest.fn();
  const mockSetLocation = jest.fn();
  const mockSetHistoricalPageData = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useLoginQuery as jest.Mock).mockImplementation(() => ({
      loginData: null,
      error: null,
      isLoading: false,
      isSuccess: true,
      refetch: jest.fn(),
    }));
  });

  beforeAll(() => {
    Object.defineProperty(window, 'location', {
      value: {
        ...window.location,
        reload: jest.fn(),
      },
      writable: true,
    });
  });

  const renderComponent = (anchorElUser: HTMLElement | null, isLightTheme = true) => {
    return renderWithQueryClient(
      <HistoricalContext.Provider
        value={{
          temperatureScale: 'Celsius',
          setTemperatureScale: mockSetTemperatureScale,
          setLocation: mockSetLocation,
          setHistoricalPageData: mockSetHistoricalPageData,
        } as any}
      >
        <ProfileMenu
          anchorElUser={anchorElUser}
          isLightTheme={isLightTheme}
          handleSetLightTheme={mockHandleSetLightTheme}
          handleCloseMenu={mockHandleCloseMenu}
        />
      </HistoricalContext.Provider>
    );
  };

  it('matches ProfileMenu component snapshot', () => {
    const component = renderComponent(document.createElement('div'));
    expect(component).toMatchSnapshot();
  });

  it('renders login menu item when user is not logged in', () => {
    renderComponent(document.createElement('div'), true);

    const loginMenuItem = screen.getByText('Log In');
    expect(loginMenuItem).toBeInTheDocument();

    fireEvent.click(loginMenuItem);

    expect(screen.getByTestId('loginForm')).toBeInTheDocument();
  });

  it('renders logout menu item when user is logged in', () => {
    localStorage.setItem('token', 'mockToken');
    renderComponent(document.createElement('div'), true);

    const logoutMenuItem = screen.getByText('Log Out');
    expect(logoutMenuItem).toBeInTheDocument();

    fireEvent.click(logoutMenuItem);

    expect(mockSetLocation).toHaveBeenCalledWith({ name: '', lat: 0, lon: 0 });
    expect(mockSetHistoricalPageData).toHaveBeenCalledWith([]);
    expect(mockHandleCloseMenu).toHaveBeenCalled();
    expect(localStorage.getItem('token')).toBeNull();
  });

  it('toggles temperature scale to Fahrenheit', () => {
    renderComponent(document.createElement('div'));

    const fahrenheitButton = screen.getByText('°F');
    fireEvent.click(fahrenheitButton);

    expect(mockSetTemperatureScale).toHaveBeenCalledWith('fahrenheit');
  });

  it('toggles temperature scale to Celsius', () => {
    renderComponent(document.createElement('div'));

    const celsiusButton = screen.getByText('°C');
    fireEvent.click(celsiusButton);

    expect(mockSetTemperatureScale).toHaveBeenCalledWith('celsius');
  });

  it('toggles theme to dark mode', () => {
    renderComponent(document.createElement('div'), true);

    const darkModeButton = screen.getByTestId('darkModeButton');
    fireEvent.click(darkModeButton);

    expect(mockHandleSetLightTheme).toHaveBeenCalledWith(false);
  });

  it('toggles theme to light mode', () => {
    renderComponent(document.createElement('div'), false);

    const lightModeButton = screen.getByTestId('lightModeButton');
    fireEvent.click(lightModeButton);

    expect(mockHandleSetLightTheme).toHaveBeenCalledWith(true);
  });
});