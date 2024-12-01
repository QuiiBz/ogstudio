import { Button, Flex, Heading, Separator } from "@radix-ui/themes";
import Link from "next/link";
import { ArrowRightIcon } from "../icons/ArrowRightIcon";
import { TEMPLATES, toTemplateSlug } from "../../lib/templates";
import { OgImage } from "../OgImage";
import { HomeSplashMyImages } from "./HomeSplashMyImages";

export function HomeSplash() {
  return (
    <>
      <Flex direction="column" gap="4">
        <Flex align="center" justify="between">
          <Heading as="h2" size="5" weight="regular">
            Templates
          </Heading>
          <Button asChild color="gray" radius="full" variant="ghost">
            <Link href="/templates">
              See all ({TEMPLATES.length})
              <ArrowRightIcon />
            </Link>
          </Button>
        </Flex>
        <Flex gap="2" className="overflow-x-scroll max-w-[100vw] no-scrollbar">
          {TEMPLATES.slice(0, 3).map((template) => (
            <OgImage
              elements={template.elements}
              href={`/templates/${toTemplateSlug(template)}`}
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
