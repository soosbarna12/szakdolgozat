import { useQuery } from "@tanstack/react-query";
import { useAlert } from "../utils/AlertContext";
import axios from "axios";


export function useTodayDataQuery(lat: number, lon: number) {
  const { showAlert } = useAlert();
  
  const { data, error, isLoading } = useQuery({
    queryKey: ["todayWeatherData", lat, lon],
    queryFn: async () => {
      const response = await axios.get(`/today/locationData`, {
        //params: { location, lang: "en" },
        params: { lat, lon, lang: "en" },
      });

      if (response.data?.cod === "404") {
        throw new Error("City not found");
      }

      return response.data;
    },
    enabled: !!(lat && lon)
  });

  if (error) {
    showAlert("Error fetching today's weather data", "error");
  }

  return { data, error, isLoading };
}
