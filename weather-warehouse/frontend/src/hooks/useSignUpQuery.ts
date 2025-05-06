import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useAlert } from "../utils/AlertContext";
import axios from "../utils/axiosConfig";


export function useSignUpQuery(username: string, password: string, securityQuestion: string, securityAnswer: string) {
  const { showAlert } = useAlert();
  
  const { data: registerData, error, isLoading, isSuccess, refetch } = useQuery({
    queryKey: ["register", username],
    queryFn: async () => {
      const response = await axios.post(`/api/user/register`, {
          username,
          password,
          securityQuestion,
          securityAnswer,
        });

      return response.data;
    },
      refetchOnWindowFocus: false,
      retry: 1,
      enabled: false, // Disable automatic refetching, we will call refetch() manually -> to use this query when clicking the login button
  });

  useEffect(() => {
    if (isSuccess) {
      showAlert("User registered successfully", "success");
    }
  }, [isSuccess]);

  useEffect(() => {
    if (error) {
      showAlert("Registration failed", "error");
    }
  }, [error]);

  return { registerData, error, isLoading, isSuccess, refetch };
}
