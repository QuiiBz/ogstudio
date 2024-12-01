import { Flex, SegmentedControl } from "@radix-ui/themes";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useMemo, useState } from "react";

export function usePreviewControls() {
  const [preview, setPreview] = useState<"x" | "slack" | "linkedin">("x");
  const { resolvedTheme } = useTheme();

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
                alt="X logo"
                height="16"
                src={
                  resolvedTheme === "dark"
                    ? "/images/x-light.png"
                    : "/images/x-dark.png"
                }
                width="16"
              />
              X
            </Flex>
          </SegmentedControl.Item>
          <SegmentedControl.Item value="slack">
            <Flex align="center" gap="1">
              <Image
                alt="Slack logo"
                height="16"
                src="/images/slack.png"
                width="16"
              />
              Slack
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
  }, [preview, resolvedTheme]);

  return {
    preview,
    PreviewControls,
  };
}
