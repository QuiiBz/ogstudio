import { Avatar, Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import { ArrowLeftIcon } from "../icons/ArrowLeftIcon";
import { useUser } from "../../lib/hooks/useUser";

export function SplashSection() {
  const { data } = useUser();

  return (
    <Flex align="center" justify="between" mx="2">
      <Button asChild color="gray" radius="full" variant="ghost">
        <Link href="/">
          <ArrowLeftIcon />
          Back
        </Link>
      </Button>
      <Button asChild color="gray" radius="full" variant="ghost">
        <Link href={data?.user ? "/profile" : "/login"}>
          {data?.user?.name ?? "Guest"}
          <Avatar
            fallback="G"
            radius="full"
            size="1"
            src={data?.user?.avatar}
          />
        </Link>
      </Button>
    </Flex>
  );
}
