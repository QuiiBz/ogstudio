import { Flex, SegmentedControl, Text, TextField } from "@radix-ui/themes";
import { startTransition, useState } from "react";
import { OgImage } from "../OgImage";
import { useElementsStore } from "../../stores/elementsStore";

interface PreviewProps {
  dynamicTexts: Record<string, string>;
  setDynamicTexts: (dynamicTexts: Record<string, string>) => void;
}

export function Preview({ dynamicTexts, setDynamicTexts }: PreviewProps) {
  const [preview, setPreview] = useState<"x" | "linkedin" | "facebook">("x");
  const elements = useElementsStore((state) => state.elements);

  return (
    <Flex direction="column" gap="4">
      <Flex align="center" justify="between">
        <Text size="5">Preview</Text>
        <Flex align="center" gap="4">
          <SegmentedControl.Root
            onValueChange={(value) => {
              startTransition(() => {
                setPreview(value as typeof preview);
              });
            }}
            value={preview}
          >
            <SegmentedControl.Item value="x">X (Twitter)</SegmentedControl.Item>
            <SegmentedControl.Item value="linkedin">
              LinkedIn
            </SegmentedControl.Item>
            <SegmentedControl.Item value="facebook">
              Facebook
            </SegmentedControl.Item>
          </SegmentedControl.Root>
        </Flex>
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
