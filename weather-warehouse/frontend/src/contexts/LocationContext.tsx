import React, { createContext, useState, ReactNode, Dispatch, SetStateAction, useEffect } from "react";
import { HistoricalPageData, LocationContextType, LocationData, LocationProviderProps } from "./LocationContext.type";


export const LocationContext = createContext<LocationContextType>({
	location: { name: "", lat: 0, lon: 0 },
	setLocation: () => { },
	historicalPageData: [] as any, // initialize historicalData as an empty array
	setHistoricalPageData: () => { },
});

export const LocationProvider = ({ children }: LocationProviderProps) => {
	//const [location, setLocation] = useState<LocationData>({ name: "", lat: 0, lon: 0 });

	const [location, setLocation] = useState<LocationData>(() => {
		// Retrieve the location from localStorage or use default values
		const storedLocation = localStorage.getItem("location");
		const defaultLocation = { name: "", lat: 0, lon: 0 };
		try {
			return storedLocation ? JSON.parse(storedLocation) : defaultLocation;
		} catch (error) {
			return defaultLocation;
		}
	});

	const [historicalPageData, setHistoricalPageData] = useState<HistoricalPageData[]>(() => {
		const storedData = localStorage.getItem("historicalPageData");
		try {
			return storedData ? JSON.parse(storedData) : [];
		} catch (error) {
			console.error("Failed to parse historical data from localStorage:", error);
			return [];
		}
	});

	//  historicalPageData to localStorage whenever it changes
	useEffect(() => {
		if (historicalPageData) {
			localStorage.setItem("historicalPageData", JSON.stringify(historicalPageData));
		}
	}, [historicalPageData]);


	useEffect(() => {
		// Persist location to localStorage whenever it changes
		localStorage.setItem("location", JSON.stringify(location));
	}, [location]);

	/*
	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position) => {
				const { latitude, longitude } = position.coords;
				setLocation((prevLocation) => ({ ...prevLocation, lat: latitude, lon: longitude }));
			});
		}
	}
		, []);*/


	return (
		<LocationContext.Provider value={{ location, setLocation, historicalPageData, setHistoricalPageData }}>
			{children}
		</LocationContext.Provider>
	);
};
