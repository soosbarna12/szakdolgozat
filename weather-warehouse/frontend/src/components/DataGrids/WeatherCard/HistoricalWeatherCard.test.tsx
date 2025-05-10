import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import React from 'react';
import { HistoricalContext } from '../../../contexts/HistoricalContext/HistoricalContext';
import { TemperatureScale } from '../../../types/temperatureScale.type';
import { renderWithQueryClient } from '../../../utils/test/renderWithQueryClient';
import { HistoricalWeatherCard } from './HistoricalWeatherCard';

describe('DataGrids/WeatherCard/HistoricalWeatherCard', () => {
    const mockData = {
        date: '2023-01-01',
        cityName: 'New York',
        countryCode: 'US',
        temp: 5,
        precipitation: 10,
        pressure: 1015,
        windSpeed: 5,
    };

    const renderComponent = (data = mockData, temperatureScale = TemperatureScale.Celsius) => {
        return renderWithQueryClient(
            <HistoricalContext.Provider value={{ temperatureScale } as any}>
                <HistoricalWeatherCard data={data as any} />
            </HistoricalContext.Provider>
        );
    };

    it('matches HistoricalWeatherCard component snapshot', () => {
        const component = renderComponent();
        expect(component).toMatchSnapshot();
    });

    it('renders skeleton when data is not provided', () => {
        renderComponent(null);
        const skeleton = screen.getByTestId('historicalWeatherCardSkeleton');
        expect(skeleton).toBeInTheDocument();
    });

    it('renders the correct date, city, and country', () => {
        renderComponent();
        expect(screen.getByTestId('date')).toHaveTextContent('Sunday, January 1, 2023');
        expect(screen.getByTestId('location')).toHaveTextContent('New York, US');
    });

    it('renders temperature with the correct scale and label', () => {
        renderComponent();
        const temperature = screen.getByTestId('temperature');
        expect(temperature).toHaveTextContent('5°C');
    });

    it('renders precipitation, pressure, and wind speed', () => {
        renderComponent();
        expect(screen.getByTestId('precipitation')).toHaveTextContent('Precipitation: 10 mm/h');
        expect(screen.getByTestId('pressure')).toHaveTextContent('Pressure: 1015 hPa');
        expect(screen.getByTestId('windSpeed')).toHaveTextContent('Wind: 5 m/s');
    });

    it('renders temperature in Fahrenheit when scale is set to Fahrenheit', () => {
        renderComponent(mockData, TemperatureScale.Fahrenheit);
        const temperature = screen.getByTestId('temperature');
        expect(temperature).toHaveTextContent('41°F');
    });
});