import { Button, Flex, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";
import type { Template } from "../../lib/templates";
import { OgImageInnerServer } from "../OgImage";
import { TemplateSplashButton } from "./TemplateSplashButton";
import { TemplateSplashPreview } from "./TemplateSplashPreview";

interface TemplateSplashProps {
  template: Template;
}

export function TemplateSplash({ template }: TemplateSplashProps) {
  return (
    <>
      <Flex direction="column" align="center" gap="2" py="8">
        <Heading
          as="h1"
          size="7"
          weight="medium"
          align="center"
          className="w-2/3 lg:w-full font-[Raleway]"
        >
          {template.name} Open Graph image template
        </Heading>
        <Text as="p" className="w-2/3 md:w-1/3" size="2" align="center">
          {template.description}
        </Text>
        <Flex gap="2" mt="4" align="center">
          <TemplateSplashButton template={template} />
          <Button asChild color="gray" variant="ghost" radius="full" mt="auto">
            <Link href="/templates">View all templates</Link>
          </Button>
        </Flex>
      </Flex>
      <TemplateSplashPreview
        image={<OgImageInnerServer elements={template.elements} />}
      />
    </>
  );
}
