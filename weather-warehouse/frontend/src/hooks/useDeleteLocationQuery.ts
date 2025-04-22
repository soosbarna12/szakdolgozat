import { useMutation } from "@tanstack/react-query";
import { useAlert } from "../utils/AlertContext";
import axios from "../utils/axiosConfig";

export function useDeleteLocationQuery() {
  const { showAlert } = useAlert();

  const mutation = useMutation({
    mutationFn: async (userLocationID: number) => {
      const response = await axios.delete(`/user/deleteLocation`, { params: { userLocationID } });
      return response.data;
    },
    onSuccess: () => {
      showAlert("Location deleted successfully", "success");
    },
    onError: () => {
      showAlert("Failed to delete location", "error");
    },
  });

  return mutation;
}