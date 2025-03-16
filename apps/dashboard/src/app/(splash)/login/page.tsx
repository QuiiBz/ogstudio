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
    <Flex direction="column" align="center" gap="2" py="8">
      <Heading
        as="h1"
        size="6"
        weight="regular"
        align="center"
        className="w-2/3 lg:w-full"
      >
        Sign in
      </Heading>
      <Text as="p" className="w-2/3 md:w-1/3" size="2" align="center">
        Create an account to export your images to URLs and make them available
        across your devices.
      </Text>
      <Flex direction="column" gap="2" mt="4" align="center">
        <LoginButtons />
      </Flex>
    </Flex>
  );
}
