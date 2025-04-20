import dayjs from "dayjs";
import { HistoricalDataTable, ServerHistoricalData } from "../types/historicalDataTable.type";

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
	return ((kelvin - 273.15) * 9) / 5 + 32;
}

export function convertTitleCase(str: string): string {
	return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function convertServerHistoricalData(historicalData: ServerHistoricalData[]): HistoricalDataTable[] {
	return historicalData.map((data) => ({
		date: dayjs(data.FullDate).format("YYYY-MM-DD"),
		cityName: data.CityName,
		countryCode: data.CountryCode,
		maxTemp: data.MaxTemperature,
		minTemp: data.MinTemperature,
		humidity: data.Humidity,
		windSpeed: data.WindSpeed,
		precipitation: data.Precipitation,
		pressure: data.Pressure,
		cloudCover: data.CloudCover,
	}));
}
