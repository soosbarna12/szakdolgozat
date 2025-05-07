// filepath: frontend/src/hooks/useLSTMForecast.ts
import { useQuery } from "@tanstack/react-query";
import axios from "../utils/axiosConfig";

export function useLSTMForecast(locationName: string, date: string) {
  return useQuery({
    queryKey: ["forecast", locationName, date],
    queryFn: async () => {
      // Send location and date to the backend
      const response = await axios.post("/api/forecast/forecastLSTM", {
        location: locationName,
      });

      return response.data.forecast;
    },
    enabled: !!locationName && !!date, // Only fetch if locationName and date are provided
  });
}