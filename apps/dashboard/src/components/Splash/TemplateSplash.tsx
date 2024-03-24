"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button, Text } from "@radix-ui/themes";
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
    router.push(`/?i=${id}`);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <Text size="5">{template.name} template</Text>
        <Button asChild color="gray" radius="full" variant="ghost">
          <Link href="/">
            <ArrowLeftIcon />
            Back
          </Link>
        </Button>
      </div>
      <div className="flex gap-4 justify-between">
        <OgImage elements={template.elements} size="medium" />
        <div className="flex flex-col gap-8">
          <p className="text-sm text-gray-600">{template.description}</p>
          <Button
            className="w-fit"
            color="green"
            onClick={useTemplate}
            size="3"
            variant="soft"
          >
            Start with this template
          </Button>
        </div>
      </div>
    </div>
  );
}
