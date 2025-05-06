import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import React from 'react';
import { HistoricalContext } from '../../../contexts/HistoricalContext/HistoricalContext';
import { TemperatureScale } from '../../../types/temperatureScale.type';
import { renderWithQueryClient } from '../../../utils/test/renderWithQueryClient';
import { TodayWeatherCard } from './TodayWeatherCard';

describe('DataGrids/WeatherCard/TodayWeatherCard', () => {
  const mockData = {
    weather: [
      {
        id: 501,
        main: "Rain",
        description: "moderate rain",
      }
    ],
    base: "stations",
    main: {
      temp: 284.2,
      feels_like: 282.93,
      temp_min: 283.06,
      temp_max: 286.82,
      pressure: 1021,
      humidity: 60,
      sea_level: 1021,
      grnd_level: 910
    },
    visibility: 10000,
    wind: {
      speed: 4.09,
      deg: 121,
      gust: 3.47
    },
    dt: 1726660758,
    sys: {
      type: 1,
      id: 6736,
      country: "IT",
      sunrise: 1726636384,
      sunset: 1726680975
    },
    timezone: 7200,
    id: 3165523,
    name: "Province of Turin",
    cod: 200
  };

  const renderComponent = (data = mockData, temperatureScale = TemperatureScale.Celsius) => {
    return renderWithQueryClient(
      <HistoricalContext.Provider value={{ temperatureScale } as any}>
        <TodayWeatherCard data={data as any} />
      </HistoricalContext.Provider>
    );
  };

  it('matches TodayWeatherCard component snapshot', () => {
    const component = renderComponent();
    expect(component).toMatchSnapshot();
  });

  it('renders skeleton when data is not provided', () => {
    renderComponent(null);
    const skeleton = screen.getByTestId('todayWeatherCardSkeleton');
    expect(skeleton).toBeInTheDocument();
  });

  it('renders the correct date, city, and country', () => {
    renderComponent();
    expect(screen.getByTestId('date')).toHaveTextContent('2024. szeptember 18., szerda');
    expect(screen.getByTestId('location')).toHaveTextContent('Province of Turin, IT');
  });

  it('renders temperature with the correct scale and label', () => {
    renderComponent();
    const temperature = screen.getByTestId('temperature');
    expect(temperature).toHaveTextContent('11 °C');
  });

  it('renders weather icon based on weather condition', () => {
    renderComponent();
    const weatherIcon = screen.getByTestId('weatherIcon');
    expect(weatherIcon).toBeInTheDocument();
  });

  it('renders pressure, humidity, and wind speed', () => {
    renderComponent();
    expect(screen.getByTestId('pressure')).toHaveTextContent('Pressure: 1021 hPa');
    expect(screen.getByTestId('humidity')).toHaveTextContent('Humidity: 60%');
    expect(screen.getByTestId('windSpeed')).toHaveTextContent('Wind: 4.09 m/s');
  });

  it('renders temperature in Fahrenheit when scale is set to Fahrenheit', () => {
    renderComponent(mockData, TemperatureScale.Fahrenheit);
    const temperature = screen.getByTestId('temperature');
    expect(temperature).toHaveTextContent('52 °F');
  });

});