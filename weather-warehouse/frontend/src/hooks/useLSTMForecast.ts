import { useQuery } from "@tanstack/react-query";
import axios from "../utils/axiosConfig";

export function useLSTMForecast(locationName: string) {
  return useQuery({
    queryKey: ["forecast", locationName],
    queryFn: async () => {
      const response = await axios.post("/api/forecast/forecastLSTM", { location: locationName });
      return response.data.forecast;
    },
    enabled: !!locationName,
  });
}