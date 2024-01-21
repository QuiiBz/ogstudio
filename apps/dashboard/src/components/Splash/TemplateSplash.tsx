"use client";
import { useRouter } from "next/navigation";
import { CustomLink } from "../CustomLink";
import { ArrowLeftIcon } from "../icons/ArrowLeftIcon";
import type { Template } from "../../lib/templates";
import { Button } from "../forms/Button";
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
        <h2 className="text-gray-800 text-xl">{template.name} template</h2>
        <CustomLink href="/templates" icon={<ArrowLeftIcon />}>
          Back
        </CustomLink>
      </div>
      <div className="flex gap-4 justify-between">
        <OgImage elements={template.elements} size="medium" />
        <div className="flex flex-col gap-8">
          <p className="text-sm text-gray-600">{template.description}</p>
          <Button className="w-fit" onClick={useTemplate} variant="success">
            Start with this template
          </Button>
        </div>
      </div>
    </div>
  );
}
