import Link from "next/link";
import { Button, Flex, Text } from "@radix-ui/themes";
import { ArrowLeftIcon } from "../icons/ArrowLeftIcon";
import type { Template } from "../../lib/templates";
import { OgImageInnerServer } from "../OgImage";
import { TemplateSplashButton } from "./TemplateSplashButton";
import { TemplateSplashPreview } from "./TemplateSplashPreview";

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
      <Flex gap="8" justify="between" className="flex-col sm:flex-row">
        <TemplateSplashPreview
          image={<OgImageInnerServer elements={template.elements} />}
        />
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
