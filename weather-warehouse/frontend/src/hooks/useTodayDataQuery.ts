import { useQuery } from "@tanstack/react-query";
import { useAlert } from "../utils/AlertContext";
import axios from "../utils/axiosConfig";
import { useEffect } from "react";
import { Pages } from "../types/page.type";


//export function useTodayDataQuery(lat: number, lon: number) {
export function useTodayDataQuery(locationName: string) {
  const { showAlert } = useAlert();
  
  const { data, error, isLoading } = useQuery({
    //queryKey: ["todayWeatherData", lat, lon],
    queryKey: ["todayWeatherData", locationName],
    queryFn: async () => {
      const response = await axios.get(`/today/locationData`, {
      //const response = await axios.get(`/today/saveCurrentWeather`, {
        params: { locationName, lang: "en" },
        //params: { lat, lon, lang: "en" },
      });

      if (response.data?.code === "404") {
        throw new Error("City not found");
      }

      return response.data;
    },
    //enabled: !!(lat && lon)
    enabled: !!(locationName),
  });

  useEffect(() => {
    if (error) {
      showAlert("Error fetching today's weather data", "error");
    }
  }, [error]);

  return { data, error, isLoading };
}
