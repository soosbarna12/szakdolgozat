import '@testing-library/jest-dom';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { useAlert } from '../../../utils/AlertContext';
import axios from '../../../utils/axiosConfig';
import { renderWithQueryClient } from '../../../utils/test/renderWithQueryClient';
import { PasswordRecoveryForm } from './RecoveryForm';

jest.mock('../../../utils/AlertContext', () => ({
    useAlert: jest.fn(),
}));

jest.mock('../../../utils/axiosConfig');

describe('AuthenticationForms/RecoveryForm', () => {
    const mockOnClose = jest.fn();
    const mockShowAlert = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        (useAlert as jest.Mock).mockImplementation(() => ({
            showAlert: mockShowAlert,
        }));
    });

    it('matches PasswordRecoveryForm component snapshot', () => {
        const component = renderWithQueryClient(<PasswordRecoveryForm open={true} onClose={mockOnClose} />);

        expect(component).toMatchSnapshot();
    });

    it('resets fields when the dialog is opened', () => {
        const { rerender } = renderWithQueryClient(
            <PasswordRecoveryForm open={false} onClose={mockOnClose} />
        );

        rerender(<PasswordRecoveryForm open={true} onClose={mockOnClose} />);

        // Use querySelector to find the input element
        const usernameInput = screen.getByTestId('usernameInput').querySelector('input');
        const securityAnswerInput = screen.getByTestId('securityAnswerInput').querySelector('input');
        const newPasswordInput = screen.getByTestId('newPasswordInput').querySelector('input');
        const confirmPasswordInput = screen.getByTestId('confirmPasswordInput').querySelector('input');

        expect(usernameInput).toHaveValue('');
        expect(securityAnswerInput).toHaveValue('');
        expect(newPasswordInput).toHaveValue('');
        expect(confirmPasswordInput).toHaveValue('');
    });

    it('handles user input correctly', () => {
        renderWithQueryClient(<PasswordRecoveryForm open={true} onClose={mockOnClose} />);

        const usernameInput = screen.getByTestId('usernameInput').querySelector('input');
        const securityAnswerInput = screen.getByTestId('securityAnswerInput').querySelector('input');
        const newPasswordInput = screen.getByTestId('newPasswordInput').querySelector('input');
        const confirmPasswordInput = screen.getByTestId('confirmPasswordInput').querySelector('input');

        fireEvent.change(usernameInput, { target: { value: 'testuser' } });
        fireEvent.change(securityAnswerInput, { target: { value: 'testanswer' } });
        fireEvent.change(newPasswordInput, { target: { value: 'newpassword123' } });
        fireEvent.change(confirmPasswordInput, { target: { value: 'newpassword123' } });

        expect(usernameInput).toHaveValue('testuser');
        expect(securityAnswerInput).toHaveValue('testanswer');
        expect(newPasswordInput).toHaveValue('newpassword123');
        expect(confirmPasswordInput).toHaveValue('newpassword123');
    });

    it('toggles password visibility when the visibility icon is clicked', () => {
        renderWithQueryClient(<PasswordRecoveryForm open={true} onClose={mockOnClose} />);

        const newPasswordInput = screen.getByTestId('newPasswordInput').querySelector('input');
        const toggleVisibilityButton = screen.getByTestId('togglePasswordVisibility');

        expect(newPasswordInput).toHaveAttribute('type', 'password');

        fireEvent.click(toggleVisibilityButton);

        expect(newPasswordInput).toHaveAttribute('type', 'text');
    });

    it('shows an alert and closes the dialog on successful password recovery', async () => {
        renderWithQueryClient(<PasswordRecoveryForm open={true} onClose={mockOnClose} />);

        const recoverButton = screen.getByTestId('recoverPasswordButton');

        fireEvent.click(recoverButton);

        await waitFor(() => {
            expect(mockShowAlert).toHaveBeenCalledWith('Password updated successfully', 'success');
        });

        expect(mockOnClose).toHaveBeenCalled();
    });

    it('shows an error alert on failed password recovery', async () => {
        (axios.post as jest.Mock).mockRejectedValueOnce({
            response: { data: { error: 'Password recovery failed' } },
        });

        renderWithQueryClient(<PasswordRecoveryForm open={true} onClose={mockOnClose} />);

        const recoverButton = screen.getByTestId('recoverPasswordButton');

        fireEvent.click(recoverButton);

        await waitFor(() => {
            expect(mockShowAlert).toHaveBeenCalledWith('Password recovery failed', 'error');
        });
    });
});