import { useEffect, useMemo, useState } from "react";
import { Text, Button, Flex, Dialog, Separator } from "@radix-ui/themes";
import { useElementsStore } from "../../stores/elementsStore";
import type {
  ExportRequest,
  ExportResponse,
} from "../../app/api/og/export/route";
import { useImagesStore } from "../../stores/imagesStore";
import { getDynamicTextKeys } from "../../lib/elements";
import { useUser } from "../../lib/hooks/useUser";
import { ArrowLeftIcon } from "../icons/ArrowLeftIcon";
import { Embed } from "./Embed";
import { Preview } from "./Preview";

export function ExportModal() {
  const elements = useElementsStore((state) => state.elements);
  const selectedImageId = useImagesStore((state) => state.selectedImageId);
  const dynamicTextKeys = useMemo(
    () => getDynamicTextKeys(elements),
    [elements],
  );
  const [dynamicTexts, setDynamicTexts] = useState<Record<string, string>>(() =>
    Object.fromEntries(dynamicTextKeys.map((key) => [key, "Dynamic text"])),
  );
  const [exportedKey, setKey] = useState<string | null>(null);
  const { data } = useUser();
  const isSignedIn = Boolean(data && "user" in data);

  useEffect(() => {
    async function exportUrl() {
      if (!selectedImageId || !isSignedIn) {
        return;
      }

      const response = await fetch("/api/og/export", {
        method: "POST",
        body: JSON.stringify({
          id: selectedImageId,
          elements,
        } satisfies ExportRequest),
      });

      if (!response.ok) {
        const error = ((await response.json()) as { error: string }).error;

        throw new Error(error);
      }

      const json = (await response.json()) as ExportResponse;
      setKey(json.key);
    }

    void exportUrl();
  }, [selectedImageId, elements, isSignedIn]);

  return (
    <>
      <Flex direction="column" gap="4">
        <Flex align="center" justify="between">
          <Text size="6">Export to URL</Text>
          <Dialog.Close>
            <Button color="gray" radius="full" variant="ghost">
              <ArrowLeftIcon />
              Continue editing
            </Button>
          </Dialog.Close>
        </Flex>
        <Text as="p" className="w-2/3" size="2">
          Export your Open Graph image to an URL that you can then use in your
          website. You can also see a preview of the OG Image and edit any
          dynamic text in real-time.
        </Text>
      </Flex>
      <Separator className="opacity-50" my="6" size="4" />
      <Preview dynamicTexts={dynamicTexts} setDynamicTexts={setDynamicTexts} />
      <Separator className="opacity-50" my="6" size="4" />
      <Embed dynamicTexts={dynamicTexts} exportedKey={exportedKey} />
    </>
  );
}
