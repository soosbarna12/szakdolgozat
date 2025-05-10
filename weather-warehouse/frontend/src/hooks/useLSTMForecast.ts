import { useQuery } from "@tanstack/react-query";
import axios from "../utils/axiosConfig";
import { ForecastLocationData } from "../contexts/ForecastContext/ForecastContext.type";

export function useLSTMForecast(location: ForecastLocationData) {
  const { data, error, isLoading } = useQuery({
    queryKey: ["forecast", location],
    queryFn: async () => {
      const response = await axios.post("/api/forecast/forecastLSTM", { location: location });
      return response.data;
    },
    enabled: !!location,
    retry: 1,
  });

  return { data, error, isLoading };
}