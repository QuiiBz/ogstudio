import type { MouseEvent, ReactNode } from "react";
import { Suspense, use, useMemo } from "react";
import Link from "next/link";
import { clsx } from "clsx";
import { Flex, IconButton, Skeleton, Text } from "@radix-ui/themes";
import type { OGElement } from "../lib/types";
import { renderToImg } from "../lib/export";
import { getDynamicTextKeys } from "../lib/elements";
import { CopyIcon } from "./icons/CopyIcon";
import { DeleteIcon } from "./icons/DeleteIcon";

interface OgImageInnerProps {
  elements: OGElement[];
  dynamicTexts?: Record<string, string>;
  mockDynamicTexts?: boolean;
  client?: boolean;
}

function OgImageInnerClient({
  elements,
  dynamicTexts,
  mockDynamicTexts,
}: OgImageInnerProps) {
  const texts = useMemo(() => {
    if (mockDynamicTexts) {
      const keys = getDynamicTextKeys(elements);

      return keys.reduce<Record<string, string>>((acc, key) => {
        return {
          ...acc,
          [key]: "Dynamic text",
        };
      }, {});
    }

    return dynamicTexts;
  }, [elements, dynamicTexts, mockDynamicTexts]);

  const src = use(
    useMemo(() => renderToImg(elements, texts), [elements, texts]),
  );

  return <img alt="" src={src} />;
}

export async function OgImageInnerServer({
  elements,
  dynamicTexts,
  mockDynamicTexts,
}: OgImageInnerProps) {
  const texts = useMemo(() => {
    if (mockDynamicTexts) {
      const keys = getDynamicTextKeys(elements);

      return keys.reduce<Record<string, string>>((acc, key) => {
        return {
          ...acc,
          [key]: "Dynamic text",
        };
      }, {});
    }

    return dynamicTexts;
  }, [elements, dynamicTexts, mockDynamicTexts]);

  const src = await renderToImg(elements, texts);

  return <img alt="" src={src} />;
}

interface OgImageProps {
  href?: string;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  elements?: OGElement[];
  dynamicTexts?: Record<string, string>;
  mockDynamicTexts?: boolean;
  children?: ReactNode;
  name?: string;
  copiable?: (event: MouseEvent<HTMLSpanElement>) => void;
  deletable?: (event: MouseEvent<HTMLSpanElement>) => void;
  size?: "small" | "medium";
  client?: boolean;
  preview?: "x" | "slack" | "linkedin";
  previewTitle?: string;
  previewDescription?: string;
  previewUrl?: string;
  previewSite?: string;
  className?: string;
  src?: string;
}

export function OgImage({
  href,
  onClick,
  elements,
  dynamicTexts,
  mockDynamicTexts,
  children,
  name,
  copiable,
  deletable,
  // size = "small",
  client,
  preview,
  previewTitle = "Your page title",
  previewDescription = "Your page description.",
  previewUrl = "website.com",
  previewSite = "Your site",
  className,
  src,
}: OgImageProps) {
  const Tag = href ? Link : onClick ? "button" : "div";

  const WrapperComponent = useMemo(() => {
    if (preview === "slack") {
      return function Wrapper(props: { children: ReactNode }) {
        return (
          <Flex gap="3">
            <div className="bg-[#35373B] min-w-1 h-full rounded" />
            <Flex direction="column" className="gap-0.5">
              <p className="text-[#D1D2D3] text-[15px] font-black">
                {previewSite}
              </p>
              <p className="text-[#1D9BD1] text-[15px] font-bold break-words">
                {previewTitle}
              </p>
              <p className="text-[#D1D2D3] text-[15px]">{previewDescription}</p>
              {props.children}
            </Flex>
          </Flex>
        );
      };
    }

    return function Wrapper(props: { children: ReactNode }) {
      return <>{props.children}</>;
    };
  }, [preview, previewDescription, previewSite, previewTitle]);

  return (
    <WrapperComponent>
      <Tag
        className={clsx(
          className,
          "min-h-[252px] min-w-[480px] flex flex-col items-center justify-center rounded relative group overflow-hidden",
          {
            "rounded-2xl h-[calc(251px-20px)]": preview === "x",
            "rounded-lg max-h-[189px] max-w-[360px]": preview === "slack",
            "rounded-md": preview === "linkedin",
          },
        )}
        // @ts-expect-error - href is not a valid prop for button
        href={href}
        onClick={onClick}
        style={{ border: "1px solid var(--gray-6)" }}
      >
        {elements && client ? (
          <Suspense fallback={<Skeleton height="10%" width="60%" />}>
            <OgImageInnerClient
              dynamicTexts={dynamicTexts}
              elements={elements}
              mockDynamicTexts={mockDynamicTexts}
            />
          </Suspense>
        ) : null}
        {elements && !client ? (
          <OgImageInnerServer
            dynamicTexts={dynamicTexts}
            elements={elements}
            mockDynamicTexts={mockDynamicTexts}
          />
        ) : null}
        {src ? <img alt="" src={src} className="w-fit h-fit" /> : null}
        {children}
        {name ? (
          <Text
            as="span"
            className="absolute left-1 top-1 p-1 hidden group-hover:block max-w-[70%]"
            size="1"
            style={{
              backgroundColor: "var(--gray-12)",
              color: "var(--gray-1)",
              borderRadius: "var(--radius-1)",
            }}
            truncate
          >
            {name}
          </Text>
        ) : null}
        {copiable ? (
          <IconButton
            className="absolute right-8 top-1 hidden group-hover:flex"
            color="gray"
            highContrast
            onClick={(event) => {
              event.preventDefault();
              copiable(event);
            }}
            size="1"
            variant="solid"
          >
            <CopyIcon />
          </IconButton>
        ) : null}
        {deletable ? (
          <IconButton
            className="absolute right-1 top-1 hidden group-hover:flex"
            color="gray"
            highContrast
            onClick={(event) => {
              event.preventDefault();
              deletable(event);
            }}
            size="1"
            variant="solid"
          >
            <DeleteIcon />
          </IconButton>
        ) : null}
        {preview === "x" ? (
          <span
            className="absolute bottom-2.5 left-2.5 text-white h-5 px-2 rounded text-[12px]"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.77)" }}
          >
            {previewTitle}
          </span>
        ) : null}
        {preview === "linkedin" ? (
          <div
            className="px-3 py-2 w-full flex flex-col gap-2"
            style={{ backgroundColor: "rgb(237, 243, 248)" }}
          >
            <span
              className="text-sm font-semibold"
              style={{ color: "rgba(0, 0, 0, 0.9)" }}
            >
              {previewTitle}
            </span>
            <span className="text-xs" style={{ color: "rgba(0, 0, 0, 0.6)" }}>
              {previewUrl}
            </span>
          </div>
        ) : null}
      </Tag>
      {preview === "x" ? (
        <span className="text-[#8b98a5] text-[12px] -mt-1.5 relative">
          From {previewUrl}
        </span>
      ) : null}
    </WrapperComponent>
  );
}
