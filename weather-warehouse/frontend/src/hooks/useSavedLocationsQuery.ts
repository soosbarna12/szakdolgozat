import { useQuery } from "@tanstack/react-query";
import { useAlert } from "../utils/AlertContext";
import axios from "../utils/axiosConfig";


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

  if (error) {
    showAlert("Error fetching saved locations", "error");
  }
  if (isSuccess) {
    showAlert("Saved locations successfully", "success");
  }

  return { savedLocations, error, isLoading };
}
