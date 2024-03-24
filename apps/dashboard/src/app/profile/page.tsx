"use client";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@radix-ui/themes";
import { LogoutIcon } from "../../components/icons/LogoutIcon";
import { logoutAction } from "./logoutAction";

// export const metadata = {
//   title: "Profile - OG Studio",
//   description: "Pre-made Open Graph image templates.",
// };

export const dynamic = "force-static";

export default function Page() {
  const queryClient = useQueryClient();

  async function logout() {
    await logoutAction();
    await queryClient.invalidateQueries();

    toast("You have been logged out!");
  }

  return (
    <form action={logout}>
      <Button color="red" type="submit" variant="soft">
        <LogoutIcon />
        Sign out
      </Button>
    </form>
  );
}
