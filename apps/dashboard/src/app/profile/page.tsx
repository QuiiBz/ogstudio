"use client";
import { Button } from "@radix-ui/themes";
import { LogoutIcon } from "../../components/icons/LogoutIcon";
import { useLogout } from "../../lib/hooks/useLogout";

// export const metadata = {
//   title: "Profile - OG Studio",
//   description: "Pre-made Open Graph image templates.",
// };

export const dynamic = "force-static";

export default function Page() {
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
