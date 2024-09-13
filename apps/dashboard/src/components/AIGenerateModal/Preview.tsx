import { Flex, Text, TextField } from "@radix-ui/themes";
import { startTransition } from "react";
import { OgImage } from "../OgImage";
import { usePreviewControls } from "../../lib/hooks/usePreviewControls";
import { type OGElement } from "../../lib/types";

interface PreviewProps {
  dynamicTexts: Record<string, string>;
  setDynamicTexts: (dynamicTexts: Record<string, string>) => void;
  elements: OGElement[];
}

export function Preview({
  dynamicTexts,
  setDynamicTexts,
  elements,
}: PreviewProps) {
  const { preview, PreviewControls } = usePreviewControls();

  return (
    <Flex direction="column" gap="4">
      <Flex align="center" justify="between">
        <Text size="5">Preview</Text>
        <PreviewControls />
      </Flex>
      <Flex gap="6" justify="between">
        <OgImage
          client
          dynamicTexts={dynamicTexts}
          elements={elements}
          preview={preview}
          size="medium"
        />
        <Flex direction="column" flexGrow="1" gap="4">
          {Object.entries(dynamicTexts).map(([key, value]) => (
            <Flex direction="column" gap="2" key={key}>
              <Text size="1">{key}</Text>
              <TextField.Root
                defaultValue={value}
                onChange={(event) => {
                  startTransition(() => {
                    setDynamicTexts({
                      ...dynamicTexts,
                      [key]: event.target.value,
                    });
                  });
                }}
              />
            </Flex>
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
}
