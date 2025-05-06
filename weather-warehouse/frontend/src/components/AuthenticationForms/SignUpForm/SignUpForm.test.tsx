import '@testing-library/jest-dom';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { useSignUpQuery } from '../../../hooks/useSignUpQuery';
import { renderWithQueryClient } from '../../../utils/test/renderWithQueryClient';
import { SignUpForm } from './SignUpForm';

jest.mock('../../../hooks/useSignUpQuery', () => ({
    useSignUpQuery: jest.fn(),
}));

describe('AuthenticationForms/SignUpForm', () => {
    const mockOnClose = jest.fn();
    const mockOnRegisterSuccess = jest.fn();
    const mockRefetchRegisterQuery = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        (useSignUpQuery as jest.Mock).mockImplementation(() => ({
            isSuccess: false,
            refetch: mockRefetchRegisterQuery,
        }));
    });

    it('matches SignUpForm component snapshot', () => {
        const component = renderWithQueryClient(
            <SignUpForm open={true} onClose={mockOnClose} onRegisterSuccess={mockOnRegisterSuccess} />
        );

        expect(component).toMatchSnapshot();
    });

    it('resets fields when the dialog is opened', () => {
        const { rerender } = renderWithQueryClient(
            <SignUpForm open={false} onClose={mockOnClose} onRegisterSuccess={mockOnRegisterSuccess} />
        );

        rerender(<SignUpForm open={true} onClose={mockOnClose} onRegisterSuccess={mockOnRegisterSuccess} />);

        expect(screen.getByTestId('usernameInput').querySelector('input')).toHaveValue('');
        expect(screen.getByTestId('passwordInput').querySelector('input')).toHaveValue('');
        expect(screen.getByTestId('confirmPasswordInput').querySelector('input')).toHaveValue('');
        expect(screen.getByTestId('securityQuestionInput').querySelector('input')).toHaveValue('');
        expect(screen.getByTestId('securityAnswerInput').querySelector('input')).toHaveValue('');
    });

    it('handles user input correctly', () => {
        renderWithQueryClient(<SignUpForm open={true} onClose={mockOnClose} onRegisterSuccess={mockOnRegisterSuccess} />);

        const usernameInput = screen.getByTestId('usernameInput').querySelector('input');
        const passwordInput = screen.getByTestId('passwordInput').querySelector('input');
        const confirmPasswordInput = screen.getByTestId('confirmPasswordInput').querySelector('input');
        const securityQuestionInput = screen.getByTestId('securityQuestionInput').querySelector('input');
        const securityAnswerInput = screen.getByTestId('securityAnswerInput').querySelector('input');

        fireEvent.change(usernameInput, { target: { value: 'testuser' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });
        fireEvent.change(securityQuestionInput, { target: { value: 'What is your pet’s name?' } });
        fireEvent.change(securityAnswerInput, { target: { value: 'Fluffy' } });

        expect(usernameInput).toHaveValue('testuser');
        expect(passwordInput).toHaveValue('password123');
        expect(confirmPasswordInput).toHaveValue('password123');
        expect(securityQuestionInput).toHaveValue('What is your pet’s name?');
        expect(securityAnswerInput).toHaveValue('Fluffy');
    });

    it('toggles password visibility when the visibility icon is clicked', () => {
        renderWithQueryClient(<SignUpForm open={true} onClose={mockOnClose} onRegisterSuccess={mockOnRegisterSuccess} />);

        const passwordInput = screen.getByTestId('passwordInput').querySelector('input');
        const toggleVisibilityButton = screen.getByTestId('togglePasswordVisibility');

        expect(passwordInput).toHaveAttribute('type', 'password');

        fireEvent.click(toggleVisibilityButton);

        expect(passwordInput).toHaveAttribute('type', 'text');
    });

    it('calls refetchRegisterQuery on sign up button click', async () => {
        renderWithQueryClient(<SignUpForm open={true} onClose={mockOnClose} onRegisterSuccess={mockOnRegisterSuccess} />);

        const signUpButton = screen.getByTestId('signUpButton');

        fireEvent.click(signUpButton);

        await waitFor(() => {
            expect(mockRefetchRegisterQuery).toHaveBeenCalled();
        });
    });

    it('calls onRegisterSuccess and onClose when registration is successful', async () => {
        (useSignUpQuery as jest.Mock).mockImplementation(() => ({
            isSuccess: true,
            refetch: mockRefetchRegisterQuery,
        }));

        renderWithQueryClient(<SignUpForm open={true} onClose={mockOnClose} onRegisterSuccess={mockOnRegisterSuccess} />);

        await waitFor(() => {
            expect(mockOnRegisterSuccess).toHaveBeenCalled();
            expect(mockOnClose).toHaveBeenCalled();
        });
    });
});