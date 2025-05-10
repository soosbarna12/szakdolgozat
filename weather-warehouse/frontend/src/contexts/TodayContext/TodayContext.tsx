import React, { createContext, useEffect, useState } from "react";
import { TodayContextType, TodayLocationData, TodayProviderProps } from "./TodayContext.type";


export const TodayContext = createContext<TodayContextType>({
	location: { name: "", lat: 0, lon: 0 },
	setLocation: () => { },
});

export const TodayLocationProvider = ({ children }: TodayProviderProps) => {

	const [location, setLocation] = useState<TodayLocationData>(() => {
		const storedLocation = localStorage.getItem("todayLocation");
		const defaultLocation = { name: "", lat: 0, lon: 0 };
		try {
			return storedLocation ? JSON.parse(storedLocation) : defaultLocation;
		} catch (error) {
			return defaultLocation;
		}
	});

	useEffect(() => {
		localStorage.setItem("todayLocation", JSON.stringify(location));
	}, [location]);


	return (
		<TodayContext.Provider value={{ location, setLocation }}>
			{children}
		</TodayContext.Provider>
	);
};
