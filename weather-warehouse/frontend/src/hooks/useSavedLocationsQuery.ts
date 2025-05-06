import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { SavedUserLocation } from "../types/historicalDataTable.type";
import { useAlert } from "../utils/AlertContext";
import axios from "../utils/axiosConfig";


export function useSavedLocationQuery(open: boolean) {
  const { showAlert } = useAlert();
  
  const { data: savedLocations, error, isLoading, refetch } = useQuery({
    queryKey: ["fetchSavedLocations", open],
    queryFn: async () => {
      const response = await axios.get(`/api/user/fetchSavedLocations`);
      return response.data as SavedUserLocation[];
    },
    enabled: open,
    retry: false,
  });
  
  useEffect(() => {
    if (error) {
      showAlert("Error fetching saved locations", "error");
    }
  }, [error]);

  return { savedLocations, error, isLoading, refetch };
}
