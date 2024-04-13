"use client";
import { useRouter } from "next/navigation";
import { Button } from "@radix-ui/themes";
import { useImagesStore } from "../../stores/imagesStore";
import type { Template } from "../../lib/templates";

interface TemplateSplashButtonProps {
  template: Template;
}

export function TemplateSplashButton({ template }: TemplateSplashButtonProps) {
  const copyTemplate = useImagesStore((state) => state.copyTemplate);
  const router = useRouter();

  function useTemplate() {
    const { id } = copyTemplate(template);
    router.push(`/editor/${id}`);
  }

  return (
    <Button
      className="w-fit"
      color="green"
      onClick={useTemplate}
      variant="soft"
    >
      Start with this template
    </Button>
  );
}
