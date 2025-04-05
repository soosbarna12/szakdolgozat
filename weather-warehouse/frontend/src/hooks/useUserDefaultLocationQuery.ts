import { useQuery } from "@tanstack/react-query";
import { useAlert } from "../utils/AlertContext";
import axios from "../utils/axiosConfig";


export function useUserDefaultLocationQuery(lat: number | undefined, lon: number | undefined) {
  const { showAlert } = useAlert();
  
  const { data, error, isLoading } = useQuery({
    queryKey: ["userDefaultLocation", lat, lon],
    queryFn: async () => {
      const response = await axios.get(`/today/reverse-geocode`, {
        params: { lat, lon },
      });

      return response.data;
    },
    enabled: !!(lat && lon)
  });

  if (error) {
    showAlert("Failed to fetch reverse geocoded location:", "error");
  }

  return { data, error, isLoading };
}
