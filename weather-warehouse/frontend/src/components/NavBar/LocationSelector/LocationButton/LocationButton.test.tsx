import '@testing-library/jest-dom';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { renderWithQueryClient } from '../../../../utils/test/renderWithQueryClient';
import { LocationButton } from './LocationButton';

jest.mock('./LocationDrawer', () => ({
  LocationDrawer: ({ toggleLocationDrawer, open }: { toggleLocationDrawer: (open: boolean) => void; open: boolean }) => (
    <div data-testid="locationDrawer">
      <button data-testid="closeDrawerButton" onClick={() => toggleLocationDrawer(false)}>Close</button>
      {open && <span data-testid="drawerContent">Drawer is open</span>}
    </div>
  ),
}));

describe('NavBar/LocationSelector/LocationButton', () => {
  const renderComponent = () => {
    return renderWithQueryClient(<LocationButton />);
  };

  it('matches LocationButton component snapshot', () => {
    const component = renderComponent();
    expect(component).toMatchSnapshot();
  });

  it('renders the LocationButton and opens the LocationDrawer on click', async () => {
    renderComponent();

    const locationButton = screen.getByRole('button', { name: /open locations/i });
    expect(locationButton).toBeInTheDocument();

    fireEvent.click(locationButton);

    await waitFor(() => {
      expect(screen.getByTestId('drawerContent')).toBeInTheDocument();
    });
  });

  it('closes the LocationDrawer when the close button is clicked', async () => {
    renderComponent();

    const locationButton = screen.getByRole('button', { name: /open locations/i });
    fireEvent.click(locationButton);

    await waitFor(() => {
      expect(screen.getByTestId('drawerContent')).toBeInTheDocument();
    });

    const closeButton = screen.getByTestId('closeDrawerButton');
    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(screen.queryByTestId('drawerContent')).not.toBeInTheDocument();
    });
  });
});