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
  const [url, setUrl] = useState<URL | undefined>();
  const { preview, PreviewControls } = usePreviewControls();

  const debounced = useDebouncedCallback((maybeUrl: string) => {
    try {
      let finalUrl = maybeUrl;

      if (!maybeUrl.startsWith("http")) {
        finalUrl = `https://${maybeUrl}`;
      }

      if (
        !finalUrl.includes("://") ||
        !finalUrl.includes(".") ||
        finalUrl.endsWith(".")
      ) {
        throw new Error("Invalid URL");
      }

      // eslint-disable-next-line @typescript-eslint/no-shadow -- disable no shadow
      const url = new URL(finalUrl);

      setUrl(url);
      setLoading(true);

      fetch(`/api/og/check?url=${encodeURIComponent(url.toString())}`)
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
    <>
      <Flex direction="column" align="center" gap="2" py="8">
        <Heading as="h1" size="6" weight="regular">
          Open Graph Image Checker
        </Heading>
        <Text as="p" className="w-2/3 md:w-1/3" size="2" align="center">
          Free tool to check the Open Graph meta tags of any website. Enter a
          URL to get started:
        </Text>
        <Flex gap="2" mt="4" align="center">
          <TextField.Root
            radius="full"
            onChange={(event) => {
              debounced(event.target.value);
            }}
            placeholder="https://ogstudio.app"
          />
        </Flex>
      </Flex>
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
                previewSite={data["og:site_name"] || url?.hostname}
                size="medium"
              />
            </Flex>
          ) : null}
          {loading ? <Skeleton width="480px" height="252px" /> : null}
        </Flex>
      ) : null}
    </>
  );
}
