import type { MouseEvent, ReactNode } from "react";
// eslint-disable-next-line import/named -- todo
import { Suspense, use, useMemo } from "react";
import Link from "next/link";
import { clsx } from "clsx";
import { IconButton, Skeleton, Text } from "@radix-ui/themes";
import type { OGElement } from "../lib/types";
import { renderToImg } from "../lib/export";
import { getDynamicTextKeys } from "../lib/elements";
import { CopyIcon } from "./icons/CopyIcon";
import { DeleteIcon } from "./icons/DeleteIcon";

interface OgImageInnerProps {
  elements: OGElement[];
  dynamicTexts?: Record<string, string>;
  mockDynamicTexts?: boolean;
}

function OgImageInner({
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

  const src = use(renderToImg(elements, texts));

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
  size,
}: OgImageProps) {
  const Tag = href ? Link : onClick ? "button" : "div";

  return (
    <Tag
      className={clsx(
        "h-[157px] w-[300px] min-w-[300px] flex items-center justify-center text-gray-600 border rounded border-gray-200 hover:border-gray-400 relative group overflow-hidden",
        {
          "h-[157px] w-[300px] min-w-[300px]": size === "small",
          "h-[252px] w-[480px] min-w-[480px]": size === "medium",
        },
      )}
      href={href ?? ""}
      onClick={onClick}
    >
      {elements ? (
        <Suspense fallback={<Skeleton height="10%" width="60%" />}>
          <OgImageInner
            dynamicTexts={dynamicTexts}
            elements={elements}
            mockDynamicTexts={mockDynamicTexts}
          />
        </Suspense>
      ) : null}
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
    </Tag>
  );
}
