import { useQuery } from "@tanstack/react-query";
import { Pages } from "../types/page.type";
import axios from "../utils/axiosConfig";



export function useGeolocationQuery(locationName: string, type: Pages) {
  const { data, error, isLoading } = useQuery({
    queryKey: ["locationName", locationName],
    queryFn: async () => {
      if (!locationName.trim()) {
        return [];
      }

      try {
        const response = await axios.get(`/api/today/location`, {
          params: {
            location: locationName.trim(),
           },
        });

        if (!response?.data || response?.data?.length === 0) {
          return [];
        }

        // filter out duplicates based on location name and country
        const uniqueResults = response.data.filter(
          (loc: any, index: number, self: any[]) =>
            index ===
            self.findIndex(
              (t) => t.name === loc.name && t.state === loc.state && t.country === loc.country
            )
        );
        
        return uniqueResults;
      } catch (error) {
        throw new Error("Failed to fetch geolocation data");
      }
    },
    enabled: (locationName.length !== 0 && type === Pages.Today),
    refetchOnWindowFocus: false,
  });

  return { data, error, isLoading };
}