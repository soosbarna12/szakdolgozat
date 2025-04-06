export function convertKelvinToCelsius(kelvin: number): number {
	return Math.round(kelvin - 273.15);
}

export function convertKelvinToFahrenheit(kelvin: number): number {
	return ((kelvin - 273.15) * 9) / 5 + 32;
}

export function convertTitleCase(str: string): string {
	return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
