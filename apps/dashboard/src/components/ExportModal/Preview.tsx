import { Flex, Heading, Skeleton, Text, TextField } from "@radix-ui/themes";
import { startTransition, useEffect, useState } from "react";
import { OgImage } from "../OgImage";
import { useElementsStore } from "../../stores/elementsStore";
import { usePreviewControls } from "../../lib/hooks/usePreviewControls";
import { renderToImg } from "../../lib/export";

interface PreviewProps {
  dynamicTexts: Record<string, string>;
  setDynamicTexts: (dynamicTexts: Record<string, string>) => void;
}

export function Preview({ dynamicTexts, setDynamicTexts }: PreviewProps) {
  const { preview, PreviewControls } = usePreviewControls();
  const elements = useElementsStore((state) => state.elements);
  const [src, setSrc] = useState<string | undefined>();

  useEffect(() => {
    async function render() {
      setSrc(await renderToImg(elements, dynamicTexts));
    }

    void render();
  }, [elements, dynamicTexts]);

  return (
    <Flex direction="column" gap="4">
      <Heading as="h2" size="5" weight="regular">
        Live preview
      </Heading>
      <Flex gap="6" justify="between" align="start" minHeight="353px">
        <Flex direction="column" gap="2">
          <PreviewControls />
          <OgImage preview={preview} size="medium" src={src}>
            {src ? null : <Skeleton height="10%" width="60%" />}
          </OgImage>
        </Flex>
        <Flex direction="column" flexGrow="1" gap="4" mt="7">
          {Object.keys(dynamicTexts).length === 0 ? (
            <Text as="p" size="2">
              No dynamic texts found.
            </Text>
          ) : null}
          {Object.entries(dynamicTexts).map(([key, value]) => (
            <Flex direction="column" gap="1" key={key}>
              <Text as="p" size="1">
                {key}
              </Text>
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
