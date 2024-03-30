import { Button, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import { GitHubIcon } from "../../../components/icons/GitHubIcon";
import { GoogleIcon } from "../../../components/icons/GoogleIcon";

export const metadata = {
  title: "Templates - OG Studio",
  description: "Sign in to export your images and sync them across devices.",
};

export const dynamic = "force-static";

export default function Page() {
  return (
    <Flex align="center" direction="column" gap="6" justify="center" mx="9">
      <Flex align="center" direction="column" gap="2">
        <Text size="5">Sign in</Text>
        <Text align="center" as="p" size="2">
          Create an account to export your images to URLs <br /> and make them
          available in all your devices.
        </Text>
      </Flex>
      <Flex align="center" direction="column" gap="2">
        <Button asChild color="gray" variant="soft">
          <Link href="/api/auth/github">
            <GitHubIcon />
            Sign in with GitHub
          </Link>
        </Button>
        <Button asChild color="gray" variant="soft">
          <Link href="/api/auth/google">
            <GoogleIcon />
            Sign in with Google
          </Link>
        </Button>
      </Flex>
    </Flex>
  );
}
