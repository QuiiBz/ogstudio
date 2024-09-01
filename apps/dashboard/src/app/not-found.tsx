import { Button, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import { ArrowRightIcon } from "../components/icons/ArrowRightIcon";
import { Splash } from "../components/Splash";

export const metadata = {
  title: "404 - OG Studio",
  description: "This page could not be found.",
};

export const dynamic = "force-static";

export default function NotFound() {
  return (
    <Splash>
      <Flex align="center" direction="column" gap="6" justify="center" mx="9">
        <Flex align="center" direction="column" gap="2">
          <Text size="5">404</Text>
          <Text align="center" as="p" size="2">
            This page could not be found.
          </Text>
        </Flex>
        <Flex align="center" direction="column" gap="2">
          <Button asChild color="gray" variant="soft">
            <Link href="/">
              <ArrowRightIcon />
              Back to home
            </Link>
          </Button>
          <Button asChild color="gray" variant="soft">
            <Link href="/templates">
              <ArrowRightIcon />
              Back to templates
            </Link>
          </Button>
        </Flex>
      </Flex>
    </Splash>
  );
}
