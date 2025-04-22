import { useQuery } from "@tanstack/react-query";
import { useAlert } from "../utils/AlertContext";
import axios from "../utils/axiosConfig";
import { useEffect } from "react";
import { SavedUserLocation } from "../types/historicalDataTable.type";


export function useSavedLocationQuery(open: boolean) {
  const { showAlert } = useAlert();
  
  const { data: savedLocations, error, isLoading, isSuccess, refetch } = useQuery({
    queryKey: ["fetchSavedLocations", open],
    queryFn: async () => {
      const response = await axios.get(`/user/fetchSavedLocations`);
      return response.data as SavedUserLocation[];
    },
    enabled: open,
  });

  useEffect(() => {
    if (isSuccess) {
      showAlert("Saved locations successfully", "success");
    }
  }, [isSuccess]);
  
  useEffect(() => {
    if (error) {
      showAlert("Error fetching saved locations", "error");
    }
  }, [error]);

  return { savedLocations, error, isLoading, refetch };
}
