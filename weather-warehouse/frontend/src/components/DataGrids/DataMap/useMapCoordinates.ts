import { useEffect, useState } from "react";

export function useMapCoordinates(data: any) {
  const [coords, setCoords] = useState<[number, number]>([51.505, -0.09]);

  useEffect(() => {
    if (data && data.coord) {
      setCoords([data.coord.lat, data.coord.lon]);
    }
  }, [data]);

  return coords;
}
