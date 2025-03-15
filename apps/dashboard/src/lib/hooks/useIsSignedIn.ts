import { useUser } from "./useUser";

export function useIsSignedIn() {
  const { data } = useUser();
  return Boolean(data && "session" in data && "user" in data.session);
}
