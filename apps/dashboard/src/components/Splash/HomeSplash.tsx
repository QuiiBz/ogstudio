import { Button, Flex, Separator, Text } from "@radix-ui/themes";
import Link from "next/link";
import { ArrowRightIcon } from "../icons/ArrowRightIcon";
import { TEMPLATES } from "../../lib/templates";
import { OgImage } from "../OgImage";
import { HomeSplashMyImages } from "./HomeSplashMyImages";

export function HomeSplash() {
  return (
    <>
      <Flex direction="column" gap="4">
        <Flex align="center" justify="between">
          <Text size="5">Templates</Text>
          <Button asChild color="gray" radius="full" variant="ghost">
            <Link href="/templates">
              See all ({TEMPLATES.length})
              <ArrowRightIcon />
            </Link>
          </Button>
        </Flex>
        <Flex gap="2">
          {TEMPLATES.slice(0, 3).map((template) => (
            <OgImage
              elements={template.elements}
              href={`/templates/${template.name.toLowerCase()}`}
              key={template.name}
              mockDynamicTexts
              name={template.name}
            />
          ))}
        </Flex>
      </Flex>
      <Separator className="opacity-50" my="6" size="4" />
      <HomeSplashMyImages />
    </>
  );
}
