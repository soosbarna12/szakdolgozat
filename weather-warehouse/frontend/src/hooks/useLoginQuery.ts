import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useAlert } from "../utils/AlertContext";
import axios from "../utils/axiosConfig";


export function useLoginQuery(username: string, password: string) {
  const { showAlert } = useAlert();
  
  const { data: loginData, error, isLoading, isSuccess, refetch } = useQuery({
    queryKey: ["login"],
    queryFn: async () => {
      const response = await axios.post(`/api/user/login`, {
          username,
          password
        });

      // store token (role is included in the token, getIsAdmin function will decode the token and check if the user is admin)
      localStorage.setItem('token', response.data.token);
      return response.data;
    },
      refetchOnWindowFocus: false,
      retry: false,
      enabled: false, // Disable automatic refetching, we will call refetch() manually -> to use this query when clicking the login button
  });

  useEffect(() => {
    if (isSuccess) {
      showAlert("Logged in successfully", "success");
    }
  }, [isSuccess]);

  useEffect(() => {
    if (error) {
      showAlert("Login failed", "error");
    }
  }, [error]);

  return { loginData, error, isLoading, isSuccess, refetch };
}
