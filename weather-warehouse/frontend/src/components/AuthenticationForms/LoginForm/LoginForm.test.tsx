import '@testing-library/jest-dom';
import { fireEvent, screen } from '@testing-library/react';
import React from 'react';
import { useLoginQuery } from '../../../hooks/useLoginQuery';
import { useSignUpQuery } from '../../../hooks/useSignUpQuery';
import { renderWithQueryClient } from '../../../utils/test/renderWithQueryClient';
import { LoginForm } from './LoginForm';

jest.mock('../../../hooks/useLoginQuery', () => ({
  useLoginQuery: jest.fn(),
}));

jest.mock('../../../hooks/useSignUpQuery', () => ({
  useSignUpQuery: jest.fn(),
}));

const mockRefetch = jest.fn();
const mockRefetchSignUp = jest.fn();

describe('AuthenticationForms/LoginForm', () => {
  const mockOnClose = jest.fn();
  const mockOnLoginSuccess = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useLoginQuery as jest.Mock).mockImplementation(() => ({
      loginData: null,
      error: null,
      isLoading: false,
      isSuccess: false,
      refetch: mockRefetch,
    }));

    // Mock useSignUpQuery
    (useSignUpQuery as jest.Mock).mockImplementation(() => ({
      registerData: null,
      error: null,
      isLoading: false,
      isSuccess: false,
      refetch: mockRefetchSignUp,
    }));
  });

  it('match LoginForm component snapshot', () => {
    const component = renderWithQueryClient(<LoginForm open={true} onClose={mockOnClose} onLoginSuccess={mockOnLoginSuccess} />);

    expect(component).toMatchSnapshot(); // Check if the rendered output matches the snapshot
  });

  it('handles user input and login button click', () => {
    renderWithQueryClient(<LoginForm open={true} onClose={mockOnClose} onLoginSuccess={mockOnLoginSuccess} />);

    // Simulate user input
    const usernameInput = screen.getByPlaceholderText('Username');
    const passwordInput = screen.getByPlaceholderText('Password');
    const loginButton = screen.getByTestId('loginButton');

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    // Check if the input values are updated
    expect(usernameInput).toHaveValue('testuser');
    expect(passwordInput).toHaveValue('password123');

    // Simulate login button click
    fireEvent.click(loginButton);

    // Verify that the login function is triggered
    expect(mockOnClose).not.toHaveBeenCalled(); // Ensure onClose is not called immediately
  });

  it('calls refetch function when login button is clicked', () => {
    renderWithQueryClient(<LoginForm open={true} onClose={mockOnClose} onLoginSuccess={mockOnLoginSuccess} />);

    // Simulate user input
    const usernameInput = screen.getByPlaceholderText('Username');
    const passwordInput = screen.getByPlaceholderText('Password');
    const loginButton = screen.getByTestId('loginButton');

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    // Simulate login button click
    fireEvent.click(loginButton);

    // Verify that the refetch function is called
    expect(mockRefetch).toHaveBeenCalled();
  });

  it('signUpButton invoked when clicking on signup button', async () => {
    renderWithQueryClient(<LoginForm open={true} onClose={mockOnClose} onLoginSuccess={mockOnLoginSuccess} />);


    const signupButton = screen.getByTestId('signUpButton');
    fireEvent.click(signupButton);


    const signUpDialog = await screen.getByTestId('signUpDialog');


    expect(mockOnClose).toHaveBeenCalled();
    expect(signUpDialog).toBeInTheDocument();
  });

  it('recoveryButton invoked when clicking on forget password button', () => {
    renderWithQueryClient(<LoginForm open={true} onClose={mockOnClose} onLoginSuccess={mockOnLoginSuccess} />);

    const recoveryButton = screen.getByTestId('recoveryButton');
    fireEvent.click(recoveryButton);

    expect(mockOnClose).toHaveBeenCalled();
  });

  it('calls refetch when login button is clicked', () => {
    renderWithQueryClient(<LoginForm open={true} onClose={mockOnClose} onLoginSuccess={mockOnLoginSuccess} />);

    const loginButton = screen.getByTestId('loginButton');

    // Simulate login button click
    fireEvent.click(loginButton);

    // Verify that refetch is called
    expect(mockRefetch).toHaveBeenCalled();
  });

  it('resets fields when the dialog is opened', () => {
    const { rerender } = renderWithQueryClient(
      <LoginForm open={false} onClose={mockOnClose} onLoginSuccess={mockOnLoginSuccess} />
    );

    rerender(
      <LoginForm open={true} onClose={mockOnClose} onLoginSuccess={mockOnLoginSuccess} />
    );

    const usernameInput = screen.getByPlaceholderText('Username');
    const passwordInput = screen.getByPlaceholderText('Password');

    // Verify that fields are reset
    expect(usernameInput).toHaveValue('');
    expect(passwordInput).toHaveValue('');
  });

  it('toggles password visibility when the visibility icon is clicked', () => {
    renderWithQueryClient(<LoginForm open={true} onClose={mockOnClose} onLoginSuccess={mockOnLoginSuccess} />);

    const passwordInput = screen.getByPlaceholderText('Password');
    const toggleVisibilityButton = screen.getByLabelText('toggle password visibility');

    // Verify initial password type
    expect(passwordInput).toHaveAttribute('type', 'password');

    // Simulate clicking the visibility toggle button
    fireEvent.click(toggleVisibilityButton);

    // Verify password type changes to text
    expect(passwordInput).toHaveAttribute('type', 'text');
  });
});