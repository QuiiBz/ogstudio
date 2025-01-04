"use client";
import {
  Flex,
  Heading,
  Skeleton,
  Table,
  Text,
  TextField,
  Tooltip,
} from "@radix-ui/themes";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { usePreviewControls } from "../../../lib/hooks/usePreviewControls";
import { InfoIcon } from "../../icons/InfoIcon";
import { OgImage } from "../../OgImage";
import {
  META_KEYS,
  META_TAGS,
  REQUIRED_META_TAGS,
  type MetaTags,
} from "../../../lib/meta";

export function OpenGraphImageChecker() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Record<MetaTags, string> | undefined>();
  const { preview, PreviewControls } = usePreviewControls();

  const debounced = useDebouncedCallback((url: string) => {
    try {
      let finalUrl = url;

      if (!url.startsWith("http")) {
        finalUrl = `https://${url}`;
      }

      if (!finalUrl.includes("://") || !finalUrl.includes(".")) {
        throw new Error("Invalid URL");
      }

      const maybeUrl = new URL(finalUrl);

      setLoading(true);

      fetch(`/api/og/check?url=${encodeURIComponent(maybeUrl.toString())}`)
        .then(async (response) => {
          const tempData = (await response.json()) as Record<MetaTags, string>;

          if (!response.ok) {
            throw new Error("Failed to fetch URL");
          }

          setLoading(false);
          setData(tempData);
        })
        .catch(() => {
          setLoading(false);
          setData(undefined);
        });
    } catch {
      // Ignore invalid URLs
      setLoading(false);
      setData(undefined);
    }
  }, 200);

  return (
    <Flex direction="column" gap="4">
      <Heading size="5" weight="regular">
        Open Graph Image Checker
      </Heading>
      <Text as="p" className="lg:w-2/3" size="2">
        Free tool to check Open Graph meta tags of any website. Enter a URL to
        get started:
      </Text>
      <Flex direction="column" gap="6">
        <TextField.Root
          onChange={(event) => {
            debounced(event.target.value);
          }}
          placeholder="https://ogstudio.app"
        />
        {data ?? loading ? (
          <Flex
            gap="6"
            justify="between"
            direction={{ initial: "column-reverse", md: "row" }}
          >
            <Table.Root size="1">
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeaderCell>Property</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Value</Table.ColumnHeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {META_KEYS.map((tag) => (
                  <Table.Row key={tag}>
                    <Table.RowHeaderCell>
                      <Flex align="center" gap="1">
                        <Tooltip content={META_TAGS[tag]}>
                          <InfoIcon />
                        </Tooltip>
                        {tag}
                      </Flex>
                    </Table.RowHeaderCell>
                    <Table.Cell className="break-all">
                      {loading ? (
                        <Skeleton width="300px" />
                      ) : (
                        data?.[tag] ??
                        `⚠️ Missing value (${REQUIRED_META_TAGS.includes(tag) ? "required" : "optional"})`
                      )}
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
            {data?.["og:image"] ? (
              <Flex direction="column" gap="2">
                <PreviewControls />
                <OgImage
                  src={data["og:image"]}
                  preview={preview}
                  previewTitle={data["og:title"]}
                  previewDescription={data["og:description"]}
                  previewUrl={data["og:url"]}
                  previewSite={data["og:site_name"]}
                  size="medium"
                />
              </Flex>
            ) : null}
            {loading ? <Skeleton width="480px" height="252px" /> : null}
          </Flex>
        ) : null}
      </Flex>
    </Flex>
  );
}
