import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useAlert } from "../utils/AlertContext";
import axios from "../utils/axiosConfig";


export function useUserDefaultLocationQuery(lat: number | undefined, lon: number | undefined) {
  const { showAlert } = useAlert();
  
  const { data, error, isLoading } = useQuery({
    queryKey: ["userDefaultLocation", lat, lon],
    queryFn: async () => {
      const response = await axios.get(`/api/today/reverse-geocode`, {
        params: { lat, lon },
      });

      return response.data;
    },
    enabled: !!(lat && lon),
    retry: 1,
  });

  useEffect(() => {
    if (error) {
      showAlert("Failed to fetch reverse geocoded location:", "error");
    }
  }, [error]);

  return { data, error, isLoading };
}
