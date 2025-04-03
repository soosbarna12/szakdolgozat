import { useQuery } from "@tanstack/react-query";
import axios from "../utils/axiosConfig";


export function useGeolocationQuery(location: string) {
    
  const { data, error, isLoading } = useQuery({
    queryKey: ["location", location],
    queryFn: async () => {
      const response = await axios.get(`/geo/location`, {
        params: { location }
      })

      if (!response?.data || response?.data?.length === 0) {
        return []; // return empty array if no data found
      }

      // search for unique locations
      const newResults = response.data.filter(
        (loc: any, index: number, self: any[]) =>
          index ===
          self.findIndex(
            (t) => t.name === loc.name && t.state === loc.state && t.country === loc.country
          )
      );
      return newResults; 
    },

    enabled: !!location,
  });

  return { data, error, isLoading };
}
