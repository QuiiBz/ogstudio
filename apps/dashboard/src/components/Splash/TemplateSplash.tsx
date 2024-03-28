"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button, Flex, Text } from "@radix-ui/themes";
import { ArrowLeftIcon } from "../icons/ArrowLeftIcon";
import type { Template } from "../../lib/templates";
import { useImagesStore } from "../../stores/imagesStore";
import { OgImage } from "../OgImage";

interface TemplateSplashProps {
  template: Template;
}

export function TemplateSplash({ template }: TemplateSplashProps) {
  const copyTemplate = useImagesStore((state) => state.copyTemplate);
  const router = useRouter();

  function useTemplate() {
    const { id } = copyTemplate(template);
    router.push(`/editor?i=${id}`);
  }

  return (
    <Flex direction="column" gap="4">
      <Flex align="center" justify="between">
        <Text size="5">{template.name} template</Text>
        <Button asChild color="gray" radius="full" variant="ghost">
          <Link href="/">
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
          <Button
            className="w-fit"
            color="green"
            onClick={useTemplate}
            variant="soft"
          >
            Start with this template
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}
