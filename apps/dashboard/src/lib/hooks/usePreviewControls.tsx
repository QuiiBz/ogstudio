import { Flex, SegmentedControl } from "@radix-ui/themes";
import Image from "next/image";
import { useMemo, useState } from "react";

export function usePreviewControls() {
  const [preview, setPreview] = useState<"x" | "linkedin">("x");

  const PreviewControls = useMemo(() => {
    return function Controls() {
      return (
        <SegmentedControl.Root
          onValueChange={(value) => {
            setPreview(value as typeof preview);
          }}
          value={preview}
        >
          <SegmentedControl.Item value="x">
            <Flex align="center" gap="1">
              <Image
                alt="X (Twitter) logo"
                height="16"
                src="/images/x.png"
                width="16"
              />
              X (Twitter)
            </Flex>
          </SegmentedControl.Item>
          <SegmentedControl.Item value="linkedin">
            <Flex align="center" gap="1">
              <Image
                alt="LinkedIn logo"
                height="16"
                src="/images/linkedin.png"
                width="16"
              />
              LinkedIn
            </Flex>
          </SegmentedControl.Item>
        </SegmentedControl.Root>
      );
    };
  }, [preview]);

  return {
    preview,
    PreviewControls,
  };
}
