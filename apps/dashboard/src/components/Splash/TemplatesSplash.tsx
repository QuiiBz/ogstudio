"use client";
import { Button, Text } from "@radix-ui/themes";
import Link from "next/link";
import { ArrowLeftIcon } from "../icons/ArrowLeftIcon";
import { TEMPLATES } from "../../lib/templates";
import { OgImage } from "../OgImage";

export function TemplatesSplash() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <Text size="5">All templates</Text>
        <Button asChild color="gray" radius="full" variant="ghost">
          <Link href="/">
            <ArrowLeftIcon />
            Back
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-2 max-h-[427px] overflow-y-scroll no-scrollbar">
        {TEMPLATES.map((template) => (
          <OgImage
            elements={template.elements}
            href={`/templates/${template.name.toLowerCase()}`}
            key={template.name}
            mockDynamicTexts
            name={template.name}
          />
        ))}
      </div>
    </div>
  );
}
