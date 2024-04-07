import Link from "next/link";
import { Button, Flex, Text } from "@radix-ui/themes";
import { ArrowLeftIcon } from "../icons/ArrowLeftIcon";
import type { Template } from "../../lib/templates";
import { OgImage } from "../OgImage";
import { TemplateSplashButton } from "./TemplateSplashButton";

interface TemplateSplashProps {
  template: Template;
}

export function TemplateSplash({ template }: TemplateSplashProps) {
  return (
    <Flex direction="column" gap="4">
      <Flex align="center" justify="between">
        <Text size="5">{template.name} template</Text>
        <Button asChild color="gray" radius="full" variant="ghost">
          <Link href="/templates">
            <ArrowLeftIcon />
            Back
          </Link>
        </Button>
      </Flex>
      <Flex gap="4" justify="between">
        <OgImage elements={template.elements} size="medium" />
        <Flex direction="column" gap="4">
          <Text as="p" size="2">
            {template.description}
          </Text>
          <TemplateSplashButton template={template} />
        </Flex>
      </Flex>
    </Flex>
  );
}
