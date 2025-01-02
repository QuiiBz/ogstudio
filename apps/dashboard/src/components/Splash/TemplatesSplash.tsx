import { Button, Flex, Grid, Heading } from "@radix-ui/themes";
import Link from "next/link";
import { ArrowLeftIcon } from "../icons/ArrowLeftIcon";
import { TEMPLATES, toTemplateSlug } from "../../lib/templates";
import { OgImage } from "../OgImage";

export function TemplatesSplash() {
  return (
    <Flex direction="column" gap="4">
      <Flex align="center" justify="between">
        <Heading as="h1" size="5" weight="regular">
          All free Open Graph templates
        </Heading>
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
            href={`/templates/${toTemplateSlug(template)}`}
            key={template.name}
            mockDynamicTexts
            name={template.name}
          />
        ))}
      </Grid>
    </Flex>
  );
}
