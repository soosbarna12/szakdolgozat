import { useQuery } from "@tanstack/react-query";
import axios from "../utils/axiosConfig";

export function useLSTMForecast(locationName: string) {
  const { data, error, isLoading } = useQuery({
    queryKey: ["forecast", locationName],
    queryFn: async () => {
      const response = await axios.post("/api/forecast/forecastLSTM", { location: locationName });
      return response.data.forecast;
    },
    enabled: !!locationName,
    retry: 1,
  });

  return { data, error, isLoading };
}