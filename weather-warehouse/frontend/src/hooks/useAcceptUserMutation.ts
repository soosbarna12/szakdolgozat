import { useMutation } from "@tanstack/react-query";
import { useAlert } from "../utils/AlertContext";
import axios from "../utils/axiosConfig";


export function useAcceptUserMutation() {
  const { showAlert } = useAlert();

  const mutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await axios.post(`/user/accept`, { id });
      return response.data;
    },
    onSuccess: () => {
      showAlert("User accepted successfully", "success");
    },
    onError: () => {
      showAlert("Failed to accept user", "error");
    },
  });

  return mutation;
}
