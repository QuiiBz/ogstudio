"use client";
import { CustomLink } from "../CustomLink";
import { ArrowLeftIcon } from "../icons/ArrowLeftIcon";
import { TEMPLATES } from "../../lib/templates";
import { OgImage } from "../OgImage";

export function TemplatesSplash() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h2 className="text-gray-800 text-xl">All templates</h2>
        <CustomLink href="/" icon={<ArrowLeftIcon />}>
          Back
        </CustomLink>
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
