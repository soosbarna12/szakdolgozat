import { useMutation } from "@tanstack/react-query";
import { useAlert } from "../utils/AlertContext";
import axios from "../utils/axiosConfig";


export function useDeleteUserMutation() {
  const { showAlert } = useAlert();

  const mutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await axios.delete(`/user/delete`, { params: { id } });
      return response.data;
    },
    onSuccess: () => {
      showAlert('User deleted successfully', 'success');
    },
    onError: () => {
      showAlert('Failed to delete user', 'error');
    },
  });

  return mutation;
}
