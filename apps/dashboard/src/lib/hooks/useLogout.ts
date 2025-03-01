import { logoutAction } from "../../app/(splash)/profile/logoutAction";

export function useLogout() {
  return async function logout() {
    await logoutAction();
  };
}
