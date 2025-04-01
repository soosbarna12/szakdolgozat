import { useQuery } from "@tanstack/react-query";
import axios from "axios";


export function useGeolocationQuery(location: string) {
    
  return useQuery({
    queryKey: ["geolocation", location],
    queryFn: async () => {
      if (!location) {
        throw new Error("Location is required");
      }

      const apiKey = "462394b96065d405cd9ca7b3ef92d634";
      const response = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${apiKey}`
      );

      if (!response.data || response.data.length === 0) {
        throw new Error("Location not found");
      }

      return response.data[0]; // Return the first result
    },
    enabled: !!location,
  });
}
