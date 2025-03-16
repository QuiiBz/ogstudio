import { Button, Flex, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";
import { TEMPLATES, toTemplateSlug } from "../../lib/templates";
import { OgImage } from "../OgImage";
import { HomeSplashMyImages } from "./HomeSplashMyImages";
import { HomeSplashTitle } from "./HomeSplashTitle";

export function HomeSplash() {
  return (
    <>
      <HomeSplashTitle />
      <Flex
        gap="2"
        className="overflow-x-scroll max-w-[100vw] no-scrollbar"
        py="8"
      >
        <Flex
          direction="column"
          gap="2"
          minWidth="300px"
          className="mr-4 lg:mr-[90px]"
        >
          <Heading as="h2" size="5" weight="regular">
            Use pre-made templates
          </Heading>
          <Text as="p" size="2">
            Browse over {TEMPLATES.length} ready-to-use Open Graph image
            templates, and edit them to your liking.
          </Text>
          <Button
            asChild
            className="w-fit"
            color="indigo"
            variant="soft"
            radius="full"
            mt="auto"
          >
            <Link href="/templates">Browse all templates</Link>
          </Button>
        </Flex>
        {TEMPLATES.filter(
          (template) =>
            template.name === "Blog post" ||
            template.name === "Space" ||
            template.name === "AI Startup",
        ).map((template) => (
          <OgImage
            elements={template.elements}
            href={`/templates/${toTemplateSlug(template)}`}
            key={template.name}
            mockDynamicTexts
            name={template.name}
          />
        ))}
      </Flex>
      <HomeSplashMyImages />
    </>
  );
}
