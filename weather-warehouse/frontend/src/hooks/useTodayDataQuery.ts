import { useQuery } from "@tanstack/react-query";
import { useAlert } from "../utils/AlertContext";
import axios from "axios";


export function useTodayDataQuery(location: string) {
  const { showAlert } = useAlert();
  
  const { data, error, isLoading } = useQuery({
    queryKey: ["todayWeatherData", location],
    queryFn: async () => {
      if (!location) {
        throw new Error("Location is required");
      }

      const response = await axios.get(`/today/data`, {
        params: { location, lang: "en" },
      });

      if (response.data?.cod === "404") {
        throw new Error("City not found");
      }

      return response.data;
    },
    enabled: !!location,
  });

  if (error) {
    showAlert("Error fetching today's weather data", "error");
  }

  return { data, error, isLoading };
}
