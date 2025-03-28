import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAlert } from "../utils/AlertContext";


export function useTodayDataQuery(location: string) {
  const { showAlert } = useAlert();

  // Fetch today's weather data for the selected location
  const { data, error, isLoading } = useQuery({
    queryKey: ["todayWeatherData", location],
    queryFn: async () => {
      const response = await axios.get(`/today/data?location=${location}&lang=en`);
      if (response.data?.cod === "404") {
        throw new Error("City not found");
      }
      return response.data;
    },
    enabled: !!location, // Only fetch if location is provided
  });


  // Show alert if there is an error fetching data
  if (error) {
    showAlert("Error fetching today's weather data", "error");
  }

  return { data, error, isLoading };
}
