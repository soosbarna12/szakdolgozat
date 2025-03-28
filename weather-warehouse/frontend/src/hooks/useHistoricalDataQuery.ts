import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { UseHistoricalDataQueryProps } from "../pages/HistoricalPage/HistoricalPage.type";
import { useAlert } from "../utils/AlertContext";

export function useHistoricalDataQuery(props: Readonly<UseHistoricalDataQueryProps>) {
  const { showAlert } = useAlert();
  const { location, date } = props;


  // Fetch weather data for the selected location
  const { data, error } = useQuery({
    queryKey: ["weather", location],
    queryFn: async () => {
      const response = await axios.get(`/today/data?location=${location}&lang=en`);
      if (response.data?.cod === "404") {
        throw new Error("City not found");
      }
      return response.data;
    },
    enabled: !!location,
  });

  
    // Show alert if there is an error fetching data
    useEffect(() => {
        if (error) {
        showAlert("Error fetching data", "error");
        }
    }, [error, showAlert]);


  return { data };
}