import dayjs from "dayjs";

export interface HistoricalDataTable {
    date: string,
    cityName: string,
    countryCode: string,
    maxTemp: number | string | null,
    minTemp: number | string | null,
    humidity: number | null,
    windSpeed: number | null,
    precipitation: number | null,
    pressure: number | null,
    cloudCover: number | null,
}

export interface ServerHistoricalData {
    WeatherId: number;
    FullDate : string;
    CityName: string;
    CountryCode : string;
    Temperature : number | null;
    MinTemperature : number | null;
    MaxTemperature : number | null;
    Humidity : number | null;
    WindSpeed : number | null;
    Precipitation : number | null;
    Pressure : number | null;
    CloudCover : number | null;
    Source : string | null;
    ObservationTime : string;
}
