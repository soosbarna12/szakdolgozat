import React, { createContext, useState, ReactNode, Dispatch, SetStateAction, useEffect } from "react";
import axios from "axios";


export interface Location {
	name: string;
	lat: number;
	lon: number;
}

interface LocationContextType {
	location: Location;
	setLocation: Dispatch<SetStateAction<Location>>;
}

export const LocationContext = createContext<LocationContextType>({
	location: { name: "", lat: 0, lon: 0 },
	setLocation: () => { },
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

  // Update location using reverse geocoding if not already set
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
		<LocationContext.Provider value={{ location, setLocation }}>
			{children}
		</LocationContext.Provider>
	);
};
