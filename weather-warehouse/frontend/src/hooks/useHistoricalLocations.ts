import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Pages } from "../types/page.type";
import { useAlert } from "../utils/AlertContext";
import axios from "../utils/axiosConfig";

export function useHistoricalLocations(inputPartialLocation: string, type: Pages) {
  const { showAlert } = useAlert();
  const { data, error, isLoading } = useQuery({
    queryKey: ["historicalLocations", inputPartialLocation],
    queryFn: async () => {
      const response = await axios.get(`/api/historical/historicalLocations`, {
        params: { location: inputPartialLocation },
      });

      return response.data;
    },
    
    //enabled: (inputPartialLocation.length !== 0 && type === Pages.Historical),
    enabled: (inputPartialLocation.length !== 0 && (type === Pages.Historical || type === Pages.Forecast)),
    refetchOnWindowFocus: false, // Prevent refetching when the window regains focus
  });

  useEffect(() => {
    if (error) {
      showAlert("Error fetching historical weather location", "error");
    }
  }, [error]);

  return { data: data || [], error, isLoading };
}
