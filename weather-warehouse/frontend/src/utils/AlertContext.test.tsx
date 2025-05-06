import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AlertProvider, useAlert } from './AlertContext';
import '@testing-library/jest-dom';

function TestComponent() {
  const { showAlert } = useAlert();

  return (
    <div>
      <button onClick={() => showAlert('Test message', 'success')}>Show Success Alert</button>
      <button onClick={() => showAlert('Error message', 'error')}>Show Error Alert</button>
    </div>
  );
}

describe('utils/AlertContext', () => {
  it('displays the alert with the correct message and severity (success)', async () => {
    render(
      <AlertProvider>
        <TestComponent />
      </AlertProvider>
    );

    const button = screen.getByText('Show Success Alert');
    fireEvent.click(button);

    const alert = await screen.findByText('Test message');
    expect(alert).toBeInTheDocument();
    expect(alert).toMatchSnapshot();
  });

  it('displays the alert with the correct message and severity (error)', async () => {
    render(
      <AlertProvider>
        <TestComponent />
      </AlertProvider>
    );

    const button = screen.getByText('Show Error Alert');
    fireEvent.click(button);

    const alert = await screen.findByText('Error message');
    expect(alert).toBeInTheDocument();
    expect(alert).toMatchSnapshot();
  });

  it('closes the alert after the auto-hide duration', async () => {
    render(
      <AlertProvider>
        <TestComponent />
      </AlertProvider>
    );

    const button = screen.getByText('Show Success Alert');
    fireEvent.click(button);

    const alert = await screen.findByText('Test message');
    expect(alert).toBeInTheDocument();

    await waitFor(() => {
      expect(alert).not.toBeInTheDocument();
    }, { timeout: 5000 }); // Allow some buffer for the auto-hide duration
  });
});