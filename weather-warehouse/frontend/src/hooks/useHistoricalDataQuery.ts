/*import { useQuery } from "@tanstack/react-query";
import { UseHistoricalDataQueryProps } from "../pages/HistoricalPage/HistoricalPage.type";
import { useAlert } from "../utils/AlertContext";

export function useHistoricalDataQuery(props: Readonly<UseHistoricalDataQueryProps>) {
  const { showAlert } = useAlert();
  const { location } = props;

  const { data, error, isLoading } = useQuery({
    queryKey: ["historicalWeatherData", location],
    queryFn: async () => fetchWeatherData("/today/data", { location, lang: "en" }),
    enabled: !!location,
  });

  if (error) {
    showAlert("Error fetching historical weather data", "error");
  }

  return { data, error, isLoading };
}
*/