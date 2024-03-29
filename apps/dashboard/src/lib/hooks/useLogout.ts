import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { logoutAction } from "../../app/profile/logoutAction";

export function useLogout() {
  const queryClient = useQueryClient();

  return async function logout() {
    await logoutAction();
    await queryClient.invalidateQueries();

    toast("You have been logged out!");
  };
}
