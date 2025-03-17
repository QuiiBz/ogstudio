"use client";
import { Button, Flex, Heading } from "@radix-ui/themes";
import Link from "next/link";
import { useLogout } from "../lib/hooks/useLogout";

export function Profile() {
  const logout = useLogout();

  return (
    <Flex direction="column" align="center" gap="2" py="8">
      <Heading
        as="h1"
        size="7"
        weight="medium"
        align="center"
        className="w-2/3 lg:w-full font-[Raleway]"
      >
        My profile
      </Heading>
      <Flex gap="2" mt="4" align="center">
        <Button
          asChild
          className="w-fit"
          color="gray"
          variant="ghost"
          radius="full"
          mt="auto"
        >
          <Link href="/my-images">View my images</Link>
        </Button>
        <form action={logout}>
          <Button
            className="cursor-pointer my-auto"
            color="red"
            type="submit"
            variant="ghost"
            radius="full"
          >
            Sign out
          </Button>
        </form>
      </Flex>
    </Flex>
  );
}
