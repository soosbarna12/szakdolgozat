import React, { createContext, useState, ReactNode, Dispatch, SetStateAction, useEffect } from "react";
import axios from "axios";


export interface Location {
	name: string;
	lat: number;
	lon: number;
}

// historical page data
export interface HistoricalPageData {
	date: string;
	maxTemp: number;
	minTemp: number;
	humidity: number;
	location: string;
}

interface LocationContextType {
	location: Location;
	historicalPageData: HistoricalPageData[]; // add historicalData to the context type
	setLocation: Dispatch<SetStateAction<Location>>;
	setHistoricalPageData: Dispatch<SetStateAction<HistoricalPageData[]>>; // add setter for historicalData
}

export const LocationContext = createContext<LocationContextType>({
	location: { name: "", lat: 0, lon: 0 },
	setLocation: () => { },
	historicalPageData: [], // initialize historicalData as an empty array
	setHistoricalPageData: () => { },
});

interface LocationProviderProps {
	children: ReactNode;
}

export const LocationProvider = ({ children }: LocationProviderProps) => {
	//const [location, setLocation] = useState<Location>({ name: "", lat: 0, lon: 0 });

	const [location, setLocation] = useState<Location>(() => {
		// Retrieve the location from localStorage or use default values
		const storedLocation = localStorage.getItem("location");
		try {
			return storedLocation ? JSON.parse(storedLocation) : { name: "", lat: 0, lon: 0 };
		} catch (error) {
			console.error("Failed to parse location from localStorage:", error);
			return { name: "", lat: 0, lon: 0 };
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

  // Update location using reverse geocoding if not already set
	// used in default user location, navigator geolocation gets back coordinates
  useEffect(() => {
    if (!location.name && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await axios.get(`/today/reverse-geocode`, {
              params: { lat: latitude, lon: longitude },
            });

            const cityName = response.data || "Unknown Location";
            const updatedLocation = { name: cityName, lat: latitude, lon: longitude };

            setLocation(updatedLocation);
            localStorage.setItem("location", JSON.stringify(updatedLocation)); // Persist to localStorage
						
          } catch (error) {
            console.error("Failed to fetch reverse geocoded location:", error);
          }
        },
        (error) => {
          console.error("Geolocation error:", error);
        }
      );
    }
  }, [location]);

	useEffect(() => {
		// Persist location to localStorage whenever it changes
		localStorage.setItem("location", JSON.stringify(location));
	}, [location]);

	// Persist historical data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("historicalPageData", JSON.stringify(historicalPageData));
  }, [historicalPageData]);

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
