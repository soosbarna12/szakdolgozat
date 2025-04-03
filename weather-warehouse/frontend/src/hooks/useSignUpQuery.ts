import { useQuery } from "@tanstack/react-query";
import { useAlert } from "../utils/AlertContext";
import axios from "../utils/axiosConfig";


export function useSignUpQuery(username: string, password: string, securityQuestion: string, securityAnswer: string) {
    const { showAlert } = useAlert();
    
    const { data: registerData, error, isLoading, isSuccess, refetch } = useQuery({
      queryKey: ["register"],
      queryFn: async () => {
        const response = await axios.post(`/user/register`, {
            username,
            password,
            securityQuestion,
            securityAnswer,
          });

        // store token (role is included in the token, getIsAdmin function will decode the token and check if the user is admin)
        localStorage.setItem('token', response.data.token);
        return response.data;
      },
        refetchOnWindowFocus: false,
        retry: false,
        enabled: false, // Disable automatic refetching, we will call refetch() manually -> to use this query when clicking the login button
    });

    if (isSuccess) {
      showAlert("User registered successfully", "success");
    }

    if (error) {
      showAlert("Registration failed", "error");
    }
  
    return { registerData, error, isLoading, isSuccess, refetch };
  }