import { useQuery } from "@tanstack/react-query";
import { useAlert } from "../utils/AlertContext";
import axios from "../utils/axiosConfig";
import { useEffect } from "react";


export function useSavedLocationQuery(open: boolean) {
  const { showAlert } = useAlert();
  
  const { data: savedLocations, error, isLoading, isSuccess } = useQuery({
    queryKey: ["savedLocations", open],
    queryFn: async () => {
      const response = await axios.get(`/user/savedLocations`);
      return response.data;
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

  return { savedLocations, error, isLoading };
}
