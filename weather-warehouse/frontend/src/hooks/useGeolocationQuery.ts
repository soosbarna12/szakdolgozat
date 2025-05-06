import { useQuery } from "@tanstack/react-query";
import axios from "../utils/axiosConfig";
import { Pages } from "../types/page.type";



export function useGeolocationQuery(locationName: string, type: Pages) {
  const { data, error, isLoading } = useQuery({
    queryKey: ["locationName", locationName],
    queryFn: async () => {
      if (!locationName.trim()) {
        return []; // Return an empty array if no city name is provided
      }

      try {
        const response = await axios.get(`/today/location`, {
          params: {
            location: locationName.trim(),
           },
        });

        if (!response?.data || response?.data?.length === 0) {
          return []; // Return an empty array if no data is found
        }

        // Filter unique city results
        const uniqueResults = response.data.filter(
          (loc: any, index: number, self: any[]) =>
            index ===
            self.findIndex(
              (t) => t.name === loc.name && t.state === loc.state && t.country === loc.country
            )
        );
        //console.log("Unique results:", uniqueResults); // Log the unique results for debugging

        return uniqueResults;
      } catch (error) {
        console.error("Error fetching geolocation data:", error);
        throw new Error("Failed to fetch geolocation data");
      }
    },
    enabled: (locationName.length !== 0 && type === Pages.Today),
    refetchOnWindowFocus: false, // Prevent refetching when the window regains focus
  });

  return { data, error, isLoading };
}