import { useQuery } from "@tanstack/react-query";
import { UseHistoricalDataQueryProps } from "../pages/HistoricalPage/HistoricalPage.type";
import { useAlert } from "../utils/AlertContext";
import axios from "../utils/axiosConfig";
import { useEffect } from "react";

export function useHistoricalDataQuery(props: Readonly<UseHistoricalDataQueryProps>) {
  const { showAlert } = useAlert();
  const { location, date } = props;
  
  const { data, error, isLoading } = useQuery({
    queryKey: ["historicalWeatherData", location, date],
    queryFn: async () => {
      const response = await axios.get(`/historical/historicalData`, {
        params: { location, date },
      });

      return response.data;
    },
    enabled: !!(location && date),
  });

  useEffect(() => {
    if (error) {
      showAlert("Error fetching historical weather data", "error");
    }
  }, [error]);

  return { data, error, isLoading };
}
