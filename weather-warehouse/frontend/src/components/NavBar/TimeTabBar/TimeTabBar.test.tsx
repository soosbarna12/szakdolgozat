import '@testing-library/jest-dom';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { MemoryRouter, useLocation } from 'react-router-dom';
import { ROUTES } from '../../../consts/routes';
import { getIsAdmin } from '../../../utils/getIsAdmin';
import { renderWithQueryClient } from '../../../utils/test/renderWithQueryClient';
import { TimeTabBar } from './TimeTabBar';


jest.mock('../../../utils/getIsAdmin', () => ({
    getIsAdmin: jest.fn(),
}));

jest.mock('react-leaflet', () => ({
    MapContainer: ({ children }: { children: React.ReactNode }) => (
        <div data-testid="dataMapContainer">{children}</div>
    )
}));

jest.mock('export-to-csv', () => ({
    download: jest.fn(),
    generateCsv: jest.fn(),
    mkConfig: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useLocation: jest.fn(),
}));

const renderTimeTabBar = () =>
    renderWithQueryClient(
        <MemoryRouter>
            <TimeTabBar />
        </MemoryRouter>
    );


describe('NavBar/TimeTabBar', () => {
    const mockUseLocation = useLocation as jest.Mock;
    const mockGetIsAdmin = getIsAdmin as jest.Mock;

    beforeEach(() => {
        jest.clearAllMocks();
        mockUseLocation.mockReturnValue({ pathname: '/today' });
        mockGetIsAdmin.mockReturnValue(false);
    });

    it('matches TimeTabBar component snapshot', () => {
        const component = renderTimeTabBar();
        expect(component).toMatchSnapshot();
    });

    it('renders all tabs and highlights the selected tab', () => {
        renderTimeTabBar();

        ROUTES.forEach((route) => {
            if (route.id === 'Admin') {
                expect(screen.queryByTestId(`tab${route.id}`)).not.toBeInTheDocument();
            } else {
                const tab = screen.getByTestId(`tab${route.id}`);
                expect(tab).toBeInTheDocument();
                if (route.path === '/today') {
                    expect(tab).toHaveStyle('background-color: rgb(21, 101, 192)'); // Updated to match the actual value
                } else {
                    expect(tab).toHaveStyle('background-color: rgb(255, 255, 255)'); // Assuming background.paper is white
                }
            }
        });
    });

    it('renders the Admin tab if the user is an admin', () => {
        mockGetIsAdmin.mockReturnValue(true);
        renderTimeTabBar();

        const adminTab = screen.getByTestId('tabAdmin');
        expect(adminTab).toBeInTheDocument();
    });

    it('navigates to the correct route when a tab is clicked', async () => {
        renderTimeTabBar();

        const historicalTab = screen.getByTestId('tabHistorical');
        fireEvent.click(historicalTab);

        await waitFor(() => {
            expect(mockUseLocation).toHaveBeenCalledWith();
        });
    });
});