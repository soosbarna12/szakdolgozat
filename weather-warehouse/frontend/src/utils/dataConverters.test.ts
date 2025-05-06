import {
    convertKelvinToCelsius,
    convertKelvinToFahrenheit,
    convertCelsiusToFahrenheit,
    convertFahrenheitToCelsius,
    convertTitleCase,
    convertServerHistoricalData,
  } from './dataConverters';
  import { getDataOrNA } from './getDataOrNA';
  import dayjs from 'dayjs';
  
  jest.mock('./getDataOrNA', () => ({
    getDataOrNA: jest.fn((value) => (value !== null ? value : 'N/A')),
  }));
  
  describe('utils/dataConverters', () => {
    describe('convertKelvinToCelsius', () => {
      it('converts Kelvin to Celsius correctly', () => {
        expect(convertKelvinToCelsius(273.15)).toBe(0);
        expect(convertKelvinToCelsius(null)).toBe('N/A');
      });
    });
  
    describe('convertKelvinToFahrenheit', () => {
      it('converts Kelvin to Fahrenheit correctly', () => {
        expect(convertKelvinToFahrenheit(273.15)).toBe(32);
        expect(convertKelvinToFahrenheit(null)).toBe('N/A');
      });
    });
  
    describe('convertCelsiusToFahrenheit', () => {
      it('converts Celsius to Fahrenheit correctly', () => {
        expect(convertCelsiusToFahrenheit(0)).toBe(32);
        expect(convertCelsiusToFahrenheit(null)).toBe('N/A');
      });
    });
  
    describe('convertFahrenheitToCelsius', () => {
      it('converts Fahrenheit to Celsius correctly', () => {
        expect(convertFahrenheitToCelsius(32)).toBe(0);
        expect(convertFahrenheitToCelsius(null)).toBe('N/A');
      });
    });
  
    describe('convertTitleCase', () => {
      it('converts a string to title case', () => {
        expect(convertTitleCase('hello')).toBe('Hello');
        expect(convertTitleCase('WORLD')).toBe('World');
      });
    });
  
    describe('convertServerHistoricalData', () => {
      it('converts server historical data to HistoricalDataTable format', () => {
        const mockHistoricalData = [
          {
            LocationKey: '123',
            DateKey: '20230501',
            FullDate: '2023-05-01T00:00:00Z',
            CityName: 'New York',
            CountryCode: 'US',
            Temperature: 20,
            MaxTemperature: 25,
            MinTemperature: 15,
            Humidity: 60,
            WindSpeed: 5,
            Precipitation: 10,
            Pressure: 1015,
            CloudCover: 50,
          },
        ];
  
        const mockLocation = { lat: 40.7128, lon: -74.006 };
  
        const result = convertServerHistoricalData(mockHistoricalData, mockLocation);
  
        expect(result).toEqual([
          {
            lat: 40.7128,
            lon: -74.006,
            locationKey: '123',
            dateKey: '20230501',
            date: dayjs('2023-05-01T00:00:00Z').format('YYYY-MM-DD'),
            cityName: 'New York',
            countryCode: 'US',
            temp: 20,
            maxTemp: 25,
            minTemp: 15,
            humidity: 60,
            windSpeed: 5,
            precipitation: 10,
            pressure: 1015,
            cloudCover: 50,
          },
        ]);
  
        expect(getDataOrNA).toHaveBeenCalledTimes(8);
      });
    });
  });