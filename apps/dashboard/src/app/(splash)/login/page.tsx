import { Flex, Heading, Text } from "@radix-ui/themes";
import { LoginButtons } from "../../../components/Login";

export const metadata = {
  title: "Sign in - OG Studio",
  openGraph: {
    siteName: "OG Studio",
    images:
      "https://github.com/QuiiBz/ogstudio/blob/main/assets/builder.jpeg?raw=true",
    type: "website",
    url: "https://ogstudio.app/login",
  },
};

export const dynamic = "force-static";

export default function Page() {
  return (
    <Flex align="center" direction="column" gap="6" justify="center" mx="9">
      <Flex align="center" direction="column" gap="2">
        <Heading as="h1" size="5" weight="regular">
          Sign in
        </Heading>
        <Text align="center" as="p" size="2" className="max-w-xs">
          Create an account to export your images to URLs and make them
          available in all your devices.
        </Text>
      </Flex>
      <Flex align="center" direction="column" gap="2">
        <LoginButtons />
      </Flex>
    </Flex>
  );
}
