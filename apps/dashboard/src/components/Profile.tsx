"use client";
import { Button, Flex } from "@radix-ui/themes";
import { useLogout } from "../lib/hooks/useLogout";
import { LogoutIcon } from "./icons/LogoutIcon";
import { HomeSplashMyImages } from "./Splash/HomeSplashMyImages";

export function Profile() {
  const logout = useLogout();

  return (
    <Flex direction="column" gap="8">
      <HomeSplashMyImages />
      <form action={logout}>
        <Button color="red" type="submit" variant="soft">
          <LogoutIcon />
          Sign out
        </Button>
      </form>
    </Flex>
  );
}
