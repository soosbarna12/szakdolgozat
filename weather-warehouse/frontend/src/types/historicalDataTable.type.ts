
export interface HistoricalDataTable {
    lat: number;
    lon: number;
    locationKey: number;
    dateKey: number;
    date: string,
    cityName: string,
    countryCode: string,
    temp: number | string,
    maxTemp: number | string,
    minTemp: number | string,
    humidity: number | string,
    windSpeed: number | string,
    precipitation: number | string,
    pressure: number | string,
    cloudCover: number | string,
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
    userLocationID: number;
}