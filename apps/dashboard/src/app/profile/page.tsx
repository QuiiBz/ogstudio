'use client'
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "../../components/forms/Button";
import { LogoutIcon } from "../../components/icons/LogoutIcon";
import { logoutAction } from "./logoutAction";

export default function Page() {
  const queryClient = useQueryClient()

  async function logout() {
    await logoutAction()
    await queryClient.invalidateQueries()

    toast('You have been logged out!')
  }

  return (
    <form action={logout}>
      <Button icon={<LogoutIcon />} type="submit" variant="danger">Sign out</Button>
    </form>
  );
}
