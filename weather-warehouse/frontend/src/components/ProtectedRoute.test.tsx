import '@testing-library/jest-dom';
import { screen, waitFor } from '@testing-library/react';
import { jwtDecode } from 'jwt-decode';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { useAlert } from '../utils/AlertContext';
import { renderWithQueryClient } from '../utils/test/renderWithQueryClient';
import { ProtectedRoute } from './ProtectedRoute';

jest.mock('../utils/AlertContext', () => ({
    useAlert: jest.fn(),
}));

jest.mock('jwt-decode', () => ({
    jwtDecode: jest.fn(),
}));

// Helper function for rendering ProtectedRoute
const renderProtectedRoute = (children: React.ReactNode) => {
    return renderWithQueryClient(
        <MemoryRouter>
            <ProtectedRoute>{children}</ProtectedRoute>
        </MemoryRouter>
    );
};

describe('ProtectedRoute', () => {
    const mockShowAlert = jest.fn();
    const mockConsoleError = jest.spyOn(console, 'error').mockImplementation(() => {});

    beforeEach(() => {
        jest.clearAllMocks();
        (useAlert as jest.Mock).mockImplementation(() => ({
            showAlert: mockShowAlert,
        }));
    });

    afterAll(() => {
        mockConsoleError.mockRestore(); // Restore original console.error after all tests
    });

    it('matches ProtectedRoute component snapshot', () => {
        const component = renderProtectedRoute(
            <div data-testid="protectedContent">Protected Content</div>
        );
        expect(component).toMatchSnapshot();
    });

    it('renders children when the token is valid and role is admin', () => {
        (jwtDecode as jest.Mock).mockReturnValue({ role: 'admin' });

        localStorage.setItem('token', 'validToken');

        renderProtectedRoute(
            <div data-testid="protectedContent">Protected Content</div>
        );

        expect(screen.getByTestId('protectedContent')).toBeInTheDocument();
    });

    it('shows an alert and redirects when the token is valid but role is not admin', async () => {
        (jwtDecode as jest.Mock).mockReturnValue({ role: 'user' });

        localStorage.setItem('token', 'validToken');

        renderProtectedRoute(
            <div data-testid="protectedContent">Protected Content</div>
        );

        await waitFor(() => {
            expect(mockShowAlert).toHaveBeenCalledWith('Access Denied. Admins only.', 'error');
        });

        expect(screen.queryByTestId('protectedContent')).not.toBeInTheDocument();
    });

    it('shows an alert and redirects when the token is invalid', async () => {
        (jwtDecode as jest.Mock).mockImplementation(() => {
            throw new Error('Invalid token');
        });

        localStorage.setItem('token', 'invalidToken');

        renderProtectedRoute(
            <div data-testid="protectedContent">Protected Content</div>
        );

        await waitFor(() => {
            expect(mockShowAlert).toHaveBeenCalledWith('Invalid session. Access Denied.', 'error');
        });

        expect(screen.queryByTestId('protectedContent')).not.toBeInTheDocument();
    });

    it('shows an alert and redirects when no token is provided', async () => {
        localStorage.removeItem('token');

        renderProtectedRoute(
            <div data-testid="protectedContent">Protected Content</div>
        );

        await waitFor(() => {
            expect(mockShowAlert).toHaveBeenCalledWith('Invalid session. Access Denied.', 'error');
        });

        expect(screen.queryByTestId('protectedContent')).not.toBeInTheDocument();
    });
});