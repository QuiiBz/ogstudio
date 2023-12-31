import { useQuery } from "@tanstack/react-query";
import type { MeResponse } from "../../app/api/me/route";

export function useUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: () => fetch("/api/me").then((res) => res.json()) as Promise<MeResponse>,
  })
}
