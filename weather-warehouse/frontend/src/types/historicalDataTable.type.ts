import dayjs from "dayjs";

export interface HistoricalDataTable {
    lat: number;
    lon: number;
    locationKey: number;
    dateKey: number;
    date: string,
    cityName: string,
    countryCode: string,
    maxTemp: number | string | null,
    minTemp: number | string | null,
    humidity: number | string | null,
    windSpeed: number | string | null,
    precipitation: number | string | null,
    pressure: number | string | null,
    cloudCover: number | string | null,
}

export interface ServerHistoricalData {
    WeatherId: number;
    LocationKey: number;
    DateKey: number;
    FullDate: string;
    CityName: string;
    CountryCode: string;
    Temperature: number | null;
    MinTemperature: number | null;
    MaxTemperature: number | null;
    Humidity: number | null;
    WindSpeed: number | null;
    Precipitation: number | null;
    Pressure: number | null;
    CloudCover: number | null;
    Source: string | null;
    ObservationTime: string;
}

export interface SavedUserLocation {
    locationData: HistoricalDataTable[];
    dateSaved: string;
}