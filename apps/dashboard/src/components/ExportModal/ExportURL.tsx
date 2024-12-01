import type { ReactNode } from "react";
import { startTransition, useState } from "react";
import Link from "next/link";
import {
  Flex,
  Dialog,
  SegmentedControl,
  Code,
  Tooltip,
  IconButton,
  Heading,
} from "@radix-ui/themes";
import { toast } from "sonner";
import { useUser } from "../../lib/hooks/useUser";
import { CopyIcon } from "../icons/CopyIcon";

interface ExportURLProps {
  exportedKey: ReactNode;
  dynamicTexts: Record<string, string>;
}

export function ExportURL({ exportedKey, dynamicTexts }: ExportURLProps) {
  const [type, setType] = useState<"html" | "url">("html");
  const { data } = useUser();
  const isSignedIn = Boolean(data && "user" in data);

  const key = exportedKey ?? <span className="blur-sm">{"x".repeat(32)}</span>;
  let url = (
    <>
      {typeof window !== "undefined" ? window.location.origin : ""}/api/og/{key}
    </>
  );

  if (Object.keys(dynamicTexts).length > 0) {
    url = (
      <>
        {url}
        <b>
          ?
          {encodeURI(
            Object.entries(dynamicTexts)
              .map(([k, v]) => `${k}=${v}`)
              .join("&"),
          )}
        </b>
      </>
    );
  }

  const code = (
    <Code
      className="p-3 overflow-x-scroll whitespace-nowrap no-scrollbar"
      color="gray"
      highContrast
      id="embed-code"
      size="2"
    >
      {type === "html" ? (
        <>
          &lt;meta property=&quot;og:image&quot; content=&quot;
          {url}&quot;&gt;
        </>
      ) : null}
      {type === "url" ? url : null}
    </Code>
  );

  function copy() {
    const embed = document.getElementById("embed-code");

    if (embed?.textContent) {
      void navigator.clipboard.writeText(embed.textContent);

      toast.success("Copied to clipboard!");
    }
  }

  return (
    <Flex direction="column" gap="4" maxWidth="60%">
      <Flex align="center" justify="between">
        <Heading as="h2" size="5" weight="regular">
          Export to URL
        </Heading>
        <Flex align="center" gap="4">
          <Tooltip content="Copy">
            <IconButton color="gray" onClick={copy} size="2" variant="ghost">
              <CopyIcon />
            </IconButton>
          </Tooltip>
          <SegmentedControl.Root
            onValueChange={(value) => {
              startTransition(() => {
                setType(value as typeof type);
              });
            }}
            value={type}
          >
            <SegmentedControl.Item value="html">HTML</SegmentedControl.Item>
            <SegmentedControl.Item value="url">URL</SegmentedControl.Item>
          </SegmentedControl.Root>
        </Flex>
      </Flex>
      {isSignedIn ? (
        <>{code}</>
      ) : (
        <Tooltip
          content={
            <>
              <Dialog.Close>
                <Link className="underline" href="/login">
                  Sign in
                </Link>
              </Dialog.Close>
              &nbsp;to export to an URL
            </>
          }
        >
          {code}
        </Tooltip>
      )}
    </Flex>
  );
}
