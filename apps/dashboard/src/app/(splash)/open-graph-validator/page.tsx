"use client";

import {
  Code,
  Flex,
  Skeleton,
  Table,
  Text,
  TextArea,
  TextField,
  Tooltip,
} from "@radix-ui/themes";
import { useEffect, useState } from "react";
import * as htmlparser2 from "htmlparser2";
import { usePreviewControls } from "../../../lib/hooks/usePreviewControls";
import { OgImage } from "../../../components/OgImage";
import { InfoIcon } from "../../../components/icons/InfoIcon";

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

export const dynamic = "force-static";

export default function Page() {
  const [url, setUrl] = useState("https://ogstudio.app");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Record<MetaTags, string> | undefined>();
  const { preview, PreviewControls } = usePreviewControls();

  useEffect(() => {
    try {
      const maybeUrl = new URL(url);

      setLoading(true);

      fetch(maybeUrl)
        .then((response) => {
          response.text().then((text) => {
            console.log(text);

            const data: Record<MetaTags, string> = {};

            const parser = new htmlparser2.Parser({
              onopentag(name, attributes) {
                if (
                  name === "meta" &&
                  META_KEYS.includes(attributes.name ?? attributes.property)
                ) {
                  data[attributes.name ?? attributes.property] =
                    attributes.content;
                }
              },
            });

            parser.write(text);
            parser.end();

            setData(data);
            setLoading(false);
          });
        })
        .catch((error) => {
          setLoading(false);
          console.error(error);
        });
    } catch {}
  }, [url]);

  return (
    <Flex direction="column" gap="6">
      <TextField.Root
        onChange={(event) => {
          setUrl(event.target.value);
        }}
        placeholder="https://ogstudio.app"
      />
      {data ?? loading ? (
        <Flex gap="6">
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
                  <Table.Cell className="break-words">
                    {loading ? <Skeleton /> : data?.[tag] ?? "⚠️ Missing value"}
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
        </Flex>
      ) : null}
    </Flex>
  );
}
