import { useEffect } from "react";
import { useMap } from "react-leaflet";

export function MapLocationChange({ coords }: { coords: [number, number] }) {
    const map = useMap();

    useEffect(() => {
        map.setView(coords);
    }, [coords, map]);

    return null;
}
