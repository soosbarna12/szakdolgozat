import { useQuery } from "@tanstack/react-query";
import { useAlert } from "../utils/AlertContext";
import axios from "../utils/axiosConfig";
import dayjs from "dayjs";
import { HistoricalData } from "../types/historicalData.type";
import { HistoricalDataTable } from "../types/historicalDataTable.type";


export function useSaveLocationQuery(historicalData: HistoricalDataTable | undefined, date: dayjs.Dayjs | null) {
  const { showAlert } = useAlert();
  
  const selectedDate = date || dayjs(); // Use the selected date or the current date
  const dateWithOffset = selectedDate.utc().format("YYYY-MM-DDTHH:mm:ssZ"); // convert to UTC format

  const { data: saveLocations, error, isLoading, isSuccess, refetch } = useQuery({
    queryKey: ["saveLocation"],
    queryFn: async () => {
      const response = await axios.post(`/user/saveLocation`, {cityName: historicalData?.cityName, date: dateWithOffset,
        countryCode: historicalData?.countryCode});
      return response.data;
    },
    refetchOnWindowFocus: false,
    retry: false,
    enabled: false, // Disable automatic refetching, we will call refetch() manually -> to use this query when clicking the login button
  });


  return { saveLocations, error, isLoading, refetch };
}
