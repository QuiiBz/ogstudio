import { Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { TEMPLATES, toTemplateSlug } from "../../lib/templates";
import { OgImage } from "../OgImage";

export function TemplatesSplash() {
  return (
    <>
      <Flex direction="column" align="center" gap="2" py="8">
        <Heading
          as="h1"
          size="6"
          weight="regular"
          align="center"
          className="w-2/3 lg:w-full"
        >
          All free Open Graph image templates
        </Heading>
        <Text as="p" className="w-2/3 md:w-1/3" size="2" align="center">
          Browse over {TEMPLATES.length} ready-to-use Open Graph image
          templates, and edit them to your liking.
        </Text>
      </Flex>
      <Grid
        className="overflow-y-scroll no-scrollbar grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        mx="auto"
        width="fit-content"
        gap="4"
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
    </>
  );
}
