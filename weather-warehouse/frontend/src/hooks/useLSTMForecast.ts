import { useQuery } from "@tanstack/react-query";
import axios from "../utils/axiosConfig";

export function useLSTMForecast(locationName: string) {
  return useQuery({
    queryKey: ["lstmForecast", locationName],
    queryFn: async () => {
      const response = await axios.post("/forecast/lstm", { location: locationName });
      return response.data.forecast;
    },
    enabled: !!locationName, // Only fetch if locationName is provided
  });
}