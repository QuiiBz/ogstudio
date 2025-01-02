import { Avatar, Button, DropdownMenu, Flex } from "@radix-ui/themes";
import Link from "next/link";
import { ArrowLeftIcon } from "../icons/ArrowLeftIcon";
import { useUser } from "../../lib/hooks/useUser";
import { useLogout } from "../../lib/hooks/useLogout";

export function SplashSection() {
  const { data } = useUser();
  const logout = useLogout();

  return (
    <Flex align="center" justify="between" mx="2">
      <Button asChild color="gray" radius="full" variant="ghost">
        <Link href="/">
          <ArrowLeftIcon />
          Back
        </Link>
      </Button>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Button color="gray" radius="full" variant="ghost">
            {data?.user?.name ?? "Guest"}
            <Avatar
              fallback="G"
              radius="full"
              size="1"
              src={data?.user?.avatar}
            />
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content variant="soft">
          <DropdownMenu.Item asChild>
            <Link href="/templates">Browse templates</Link>
          </DropdownMenu.Item>
          <DropdownMenu.Item asChild>
            <Link href="/my-images">My images</Link>
          </DropdownMenu.Item>
          {data?.user ? (
            <>
              <DropdownMenu.Item asChild>
                <Link href="/profile">Profile</Link>
              </DropdownMenu.Item>
              <DropdownMenu.Separator />
              <DropdownMenu.Item color="red" onClick={logout}>
                Sign out
              </DropdownMenu.Item>
            </>
          ) : (
            <>
              <DropdownMenu.Separator />
              <DropdownMenu.Item asChild>
                <Link href="/login">Sign in</Link>
              </DropdownMenu.Item>
            </>
          )}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Flex>
  );
}
