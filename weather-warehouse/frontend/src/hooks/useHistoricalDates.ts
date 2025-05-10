import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useAlert } from "../utils/AlertContext";
import axios from "../utils/axiosConfig";

export function useHistoricalDates(location: string) {
  const { showAlert } = useAlert();

  const { data, error, isLoading } = useQuery({
    queryKey: ["historicalDates", location],
    queryFn: async () => {
      const response = await axios.get(`/api/historical/historicalDates`, {
        params: { location },
      });
      
      return response.data.map((date: any) => dayjs(date.date).format("YYYY-MM-DD"));
    },
    
    enabled: !!(location),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (error) {
      showAlert("Error fetching historical dates", "error");
    }
  }, [error]);

  return { data: data || [], error, isLoading };
}
