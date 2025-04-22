import { useQuery } from "@tanstack/react-query";
import { useAlert } from "../utils/AlertContext";
import axios from "../utils/axiosConfig";
import { HistoricalDataTable } from "../types/historicalDataTable.type";
import { useEffect } from "react";


export function useSaveLocationQuery(historicalPageData: HistoricalDataTable[] | undefined) {
  const { showAlert } = useAlert();
  
  const { data, error, isLoading, isSuccess, refetch } = useQuery({
    queryKey: ["saveLocation"],
    queryFn: async () => {
      const response = await axios.post(`/user/saveLocation`, {historicalPageData});
      return response.data;
    },
    refetchOnWindowFocus: false,
    retry: false,
    enabled: false, // Disable automatic refetching, we will call refetch() manually -> to use this query when clicking the login button
  });

  useEffect(() => {
    if (isSuccess) {
      showAlert("Location saved successfully", "success");
    }
  }
  , [isSuccess]);

  useEffect(() => {
    if (error) {
      showAlert("Can't save location", "error");
    }
  }
  , [error]);

  return { data, error, isLoading, refetch };
}
