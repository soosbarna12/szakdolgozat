import { LOCAL_STORAGE_TEMPERATURE_SCALE } from "../consts/temperatureScale.const";
import { TemperatureScale } from "../types/temperatureScale.type";
import { convertCelsiusToFahrenheit, convertFahrenheitToCelsius, convertKelvinToCelsius, convertKelvinToFahrenheit } from "./dataConverters";


export function temperatureScaleChanger(currentTempScale: TemperatureScale, goalTempScale: TemperatureScale, tempValue: number | string) : string | number {

  if (typeof tempValue === "string") {
    return tempValue;
  }

  // c to c / f to f
  if (goalTempScale === currentTempScale) {
    return tempValue;
  }
  if (goalTempScale === TemperatureScale.Celsius && currentTempScale === TemperatureScale.Fahrenheit) {
    return convertFahrenheitToCelsius(tempValue);
  }
  if (goalTempScale === TemperatureScale.Fahrenheit && currentTempScale === TemperatureScale.Celsius) {
    return convertCelsiusToFahrenheit(tempValue);
  }
  if (goalTempScale === TemperatureScale.Celsius && currentTempScale === TemperatureScale.Kelvin) {
    return convertKelvinToCelsius(tempValue);
  }
  if (goalTempScale === TemperatureScale.Fahrenheit && currentTempScale === TemperatureScale.Kelvin) {
    return convertKelvinToFahrenheit(tempValue);
  }

  return "N/A";
}
