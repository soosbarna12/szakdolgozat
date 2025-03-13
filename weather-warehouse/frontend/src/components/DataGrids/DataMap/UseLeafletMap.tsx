import { useEffect } from "react";
import { useMap } from "react-leaflet";

export function useLeafletMap(coords: [number, number]): void {
    const map = useMap();

    useEffect(() => {
        map.setView(coords);
    }, [coords, map]);
}
