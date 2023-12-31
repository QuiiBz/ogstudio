'use client'
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useUser } from "../../lib/hooks/useUser";
import { logoutAction } from "./logoutAction";

export default function Page() {
  const { data } = useUser()
  const queryClient = useQueryClient()

  async function logout() {
    await logoutAction()
    await queryClient.invalidateQueries()

    toast('You have been logged out')
  }

  return (
    <>
      {JSON.stringify(data)}
      <form action={logout}>
        <button type="submit">Sign out</button>
      </form>
    </>
  );
}
