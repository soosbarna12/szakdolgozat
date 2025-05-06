import { useQuery } from "@tanstack/react-query";
import { User } from "../types/userData.type";
import axios from "../utils/axiosConfig";


export function useFetchUsersQuery() {
  
  const { data, error, isLoading, refetch } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await axios.get(`/api//user/userData`);

      return response.data as User[];
    },
  });

  return { data, error, isLoading, refetch };
}
