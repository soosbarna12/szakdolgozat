import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { getWeatherIcon } from './weatherUtils';

describe('utils/weatherUtils', () => {
  it('returns the correct icon for "Clear"', () => {
    render(getWeatherIcon('Clear'));
    const icon = screen.getByTestId('wiDaySunny');
    expect(icon).toBeInTheDocument();
  });

  it('returns the correct icon for "Clouds"', () => {
    render(getWeatherIcon('Clouds'));
    const icon = screen.getByTestId('wiCloud');
    expect(icon).toBeInTheDocument();
  });

  it('returns the correct icon for "Rain"', () => {
    render(getWeatherIcon('Rain'));
    const icon = screen.getByTestId('wiRain');
    expect(icon).toBeInTheDocument();
  });

  it('returns the correct icon for "Drizzle"', () => {
    render(getWeatherIcon('Drizzle'));
    const icon = screen.getByTestId('wiRain');
    expect(icon).toBeInTheDocument();
  });

  it('returns the correct icon for "Snow"', () => {
    render(getWeatherIcon('Snow'));
    const icon = screen.getByTestId('wiSnow');
    expect(icon).toBeInTheDocument();
  });

  it('returns the correct icon for "Thunderstorm"', () => {
    render(getWeatherIcon('Thunderstorm'));
    const icon = screen.getByTestId('wiThunderstorm');
    expect(icon).toBeInTheDocument();
  });

  it('returns the correct icon for "Fog"', () => {
    render(getWeatherIcon('Fog'));
    const icon = screen.getByTestId('wiFog');
    expect(icon).toBeInTheDocument();
  });

  it('returns the correct icon for "Mist"', () => {
    render(getWeatherIcon('Mist'));
    const icon = screen.getByTestId('wiFog');
    expect(icon).toBeInTheDocument();
  });

  it('returns null for an unknown weather type', () => {
    const { container } = render(getWeatherIcon('unknown'));
    expect(container.firstChild).toBeNull();
  });
});