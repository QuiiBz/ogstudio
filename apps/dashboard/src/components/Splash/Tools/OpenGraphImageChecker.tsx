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
import { useEffect, useState } from "react";
import * as htmlparser2 from "htmlparser2";
import { usePreviewControls } from "../../../lib/hooks/usePreviewControls";
import { InfoIcon } from "../../icons/InfoIcon";
import { OgImage } from "../../OgImage";

const META_TAGS = {
  "og:title": "The title of your object as it should appear within the graph.",
  "og:description": "A one to two sentence description of your object.",
  "og:site_name": "The name which should be displayed for the overall site.",
  "og:url":
    "The canonical URL of your object that will be used as its permanent ID in the graph.",
  "og:image":
    "An image URL which should represent your object within the graph.",
} as const;

const META_KEYS = Object.keys(META_TAGS) as MetaTags[];

type MetaTags = keyof typeof META_TAGS;

export function OpenGraphImageChecker() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Record<MetaTags, string> | undefined>();
  const { preview, PreviewControls } = usePreviewControls();

  useEffect(() => {
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

      fetch(maybeUrl)
        .then(async (response) => {
          const text = await response.text();
          // @ts-expect-error missing values
          const tempData: Record<MetaTags, string> = {};

          const parser = new htmlparser2.Parser({
            onopentag(name, attributes) {
              if (
                name === "meta" &&
                META_KEYS.includes(
                  (attributes.name || attributes.property) as MetaTags,
                )
              ) {
                tempData[(attributes.name || attributes.property) as MetaTags] =
                  attributes.content;
              }
            },
          });

          parser.write(text);
          parser.end();

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
  }, [url]);

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
            setUrl(event.target.value);
          }}
          placeholder="https://ogstudio.app"
        />
        {data ?? loading ? (
          <Flex gap="6" justify="between">
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
                        data?.[tag] ?? "⚠️ Missing value"
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
