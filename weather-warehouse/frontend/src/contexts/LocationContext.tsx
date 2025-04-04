import React, { createContext, useState, ReactNode, Dispatch, SetStateAction } from "react";

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

    return (
        <LocationContext.Provider value={{ location, setLocation }}>
            {children}
        </LocationContext.Provider>
    );
};