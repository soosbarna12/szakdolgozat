import React, { createContext, useState, ReactNode, Dispatch, SetStateAction, useEffect } from "react";


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
    const [location, setLocation] = useState<Location>({ name: "", lat: 0, lon: 0 });

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                setLocation((prevLocation) => ({ ...prevLocation, lat: latitude, lon: longitude }));
            });
        }
    }
        , []);


    return (
        <LocationContext.Provider value={{ location, setLocation }}>
            {children}
        </LocationContext.Provider>
    );
};
