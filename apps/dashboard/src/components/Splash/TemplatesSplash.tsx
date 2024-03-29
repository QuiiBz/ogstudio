"use client";
import { Button, Flex, Grid, Text } from "@radix-ui/themes";
import Link from "next/link";
import { ArrowLeftIcon } from "../icons/ArrowLeftIcon";
import { TEMPLATES } from "../../lib/templates";
import { OgImage } from "../OgImage";

export function TemplatesSplash() {
  return (
    <Flex direction="column" gap="4">
      <Flex align="center" justify="between">
        <Text size="5">All templates</Text>
        <Button asChild color="gray" radius="full" variant="ghost">
          <Link href="/">
            <ArrowLeftIcon />
            Back
          </Link>
        </Button>
      </Flex>
      <Grid
        className="max-h-[427px] overflow-y-scroll no-scrollbar"
        columns="3"
        gap="2"
      >
        {TEMPLATES.map((template) => (
          <OgImage
            elements={template.elements}
            href={`/templates/${template.name.toLowerCase()}`}
            key={template.name}
            mockDynamicTexts
            name={template.name}
          />
        ))}
      </Grid>
    </Flex>
  );
}
