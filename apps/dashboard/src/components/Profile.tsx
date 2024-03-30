"use client";
import { Button } from "@radix-ui/themes";
import { useLogout } from "../lib/hooks/useLogout";
import { LogoutIcon } from "./icons/LogoutIcon";

export function Profile() {
  const logout = useLogout();

  return (
    <form action={logout}>
      <Button color="red" type="submit" variant="soft">
        <LogoutIcon />
        Sign out
      </Button>
    </form>
  );
}
