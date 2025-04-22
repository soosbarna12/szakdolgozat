import dayjs from "dayjs";
import { HistoricalDataTable, ServerHistoricalData } from "../types/historicalDataTable.type";
import { HistoricalLocationData } from "../contexts/HistoricalContext/HistoricalContext.type";
import { getDataOrNA } from "./getDataOrNA";

export function convertKelvinToCelsius(kelvin: number | null): number | string {
	if (kelvin === null) {
		return 'N/A';
	}
	return Math.round(kelvin - 273.15);
}

export function convertKelvinToFahrenheit(kelvin: number | null): number | string {
	if (kelvin === null) {
		return 'N/A';
	}
	return Math.round(((kelvin - 273.15) * 9) / 5 + 32);
}

export function convertCelsiusToFahrenheit(celsius: number | null): number | string {
	if (celsius === null) {
		return 'N/A';
	}
	return Math.round((celsius * 9) / 5 + 32);
}

export function convertFahrenheitToCelsius(fahrenheit: number | null): number | string {
	if (fahrenheit === null) {
			return 'N/A';
	}
	return Math.round((fahrenheit - 32) * 5 / 9);
}

export function convertTitleCase(str: string): string {
	return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function convertServerHistoricalData(historicalData: ServerHistoricalData[], location: HistoricalLocationData): HistoricalDataTable[] {
	return historicalData.map((data) => ({
		lat: location.lat,
		lon: location.lon,
		locationKey: data.LocationKey,
		dateKey: data.DateKey,
		date: dayjs(data.FullDate).format("YYYY-MM-DD"),
		cityName: data.CityName,
		countryCode: data.CountryCode,
		temp: getDataOrNA(data.Temperature),
		maxTemp: getDataOrNA(data.MaxTemperature),
		minTemp: getDataOrNA(data.MinTemperature),
		humidity: getDataOrNA(data.Humidity),
		windSpeed: getDataOrNA(data.WindSpeed),
		precipitation: getDataOrNA(data.Precipitation),
		pressure: getDataOrNA(data.Pressure),
		cloudCover: getDataOrNA(data.CloudCover),
	}));
}
