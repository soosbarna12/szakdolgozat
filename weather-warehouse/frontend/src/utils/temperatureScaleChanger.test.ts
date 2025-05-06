import { temperatureScaleChanger } from './temperatureScaleChanger';
import { TemperatureScale } from '../types/temperatureScale.type';
import {
  convertCelsiusToFahrenheit,
  convertFahrenheitToCelsius,
  convertKelvinToCelsius,
  convertKelvinToFahrenheit,
} from './dataConverters';

jest.mock('./dataConverters', () => ({
  convertCelsiusToFahrenheit: jest.fn(),
  convertFahrenheitToCelsius: jest.fn(),
  convertKelvinToCelsius: jest.fn(),
  convertKelvinToFahrenheit: jest.fn(),
}));

describe('utils/temperatureScaleChanger', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns the same value if tempValue is a string', () => {
    const result = temperatureScaleChanger(TemperatureScale.Celsius, TemperatureScale.Fahrenheit, 'N/A');
    expect(result).toBe('N/A');
  });

  it('returns the same value if currentTempScale and goalTempScale are the same', () => {
    const result = temperatureScaleChanger(TemperatureScale.Celsius, TemperatureScale.Celsius, 25);
    expect(result).toBe(25);
  });

  it('converts Fahrenheit to Celsius', () => {
    (convertFahrenheitToCelsius as jest.Mock).mockReturnValue(0);
    const result = temperatureScaleChanger(TemperatureScale.Fahrenheit, TemperatureScale.Celsius, 32);
    expect(result).toBe(0);
    expect(convertFahrenheitToCelsius).toHaveBeenCalledWith(32);
  });

  it('converts Celsius to Fahrenheit', () => {
    (convertCelsiusToFahrenheit as jest.Mock).mockReturnValue(32);
    const result = temperatureScaleChanger(TemperatureScale.Celsius, TemperatureScale.Fahrenheit, 0);
    expect(result).toBe(32);
    expect(convertCelsiusToFahrenheit).toHaveBeenCalledWith(0);
  });

  it('converts Kelvin to Celsius', () => {
    (convertKelvinToCelsius as jest.Mock).mockReturnValue(-273.15);
    const result = temperatureScaleChanger(TemperatureScale.Kelvin, TemperatureScale.Celsius, 0);
    expect(result).toBe(-273.15);
    expect(convertKelvinToCelsius).toHaveBeenCalledWith(0);
  });

  it('converts Kelvin to Fahrenheit', () => {
    (convertKelvinToFahrenheit as jest.Mock).mockReturnValue(-459.67);
    const result = temperatureScaleChanger(TemperatureScale.Kelvin, TemperatureScale.Fahrenheit, 0);
    expect(result).toBe(-459.67);
    expect(convertKelvinToFahrenheit).toHaveBeenCalledWith(0);
  });

  it('returns "N/A" for unsupported conversions', () => {
    const result = temperatureScaleChanger(TemperatureScale.Celsius, TemperatureScale.Kelvin, 25);
    expect(result).toBe('N/A');
  });
});