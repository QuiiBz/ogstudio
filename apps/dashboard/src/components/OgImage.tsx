import type { MouseEvent, ReactNode } from "react";
import { Suspense } from "react";
import Link from "next/link";
import usePromise from "react-promise-suspense";
import type { OGElement } from "../lib/types";
import { renderToImg } from "../lib/export";
import { CopyIcon } from "./icons/CopyIcon";
import { DeleteIcon } from "./icons/DeleteIcon";

interface OgImageInnerProps {
  elements: OGElement[];
}

function OgImageInner({ elements }: OgImageInnerProps) {
  const src = usePromise(renderToImg, [elements]);

  return <img alt="" src={src} />;
}

interface OgImageProps {
  href?: string;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  elements?: OGElement[];
  children?: ReactNode;
  name?: string;
  copiable?: (event: MouseEvent<HTMLSpanElement>) => void;
  deletable?: (event: MouseEvent<HTMLSpanElement>) => void;
}

export function OgImage({
  href,
  onClick,
  elements,
  children,
  name,
  copiable,
  deletable,
}: OgImageProps) {
  const Tag = href ? Link : "button";

  return (
    <Tag
      className="h-[157px] w-[300px] min-w-[300px] flex items-center justify-center text-gray-600 border rounded border-gray-200 hover:border-gray-400 relative group overflow-hidden"
      href={href ?? ""}
      onClick={onClick}
    >
      {elements ? (
        <Suspense
          fallback={
            <div className="animate-pulse w-3/4 h-1/6 bg-gray-100 rounded-full" />
          }
        >
          <OgImageInner elements={elements} />
        </Suspense>
      ) : null}
      {children}
      {name ? (
        <span className="absolute left-1 top-1 p-1 bg-black/60 rounded text-xs text-gray-300 hidden group-hover:block max-w-[70%] truncate">
          {name}
        </span>
      ) : null}
      {copiable ? (
        <button
          className="absolute right-8 top-1 p-1 bg-black/60 rounded text-gray-300 hover:text-gray-200 hidden group-hover:block"
          onClick={(event) => {
            event.preventDefault();
            copiable(event);
          }}
          type="button"
        >
          <CopyIcon />
        </button>
      ) : null}
      {deletable ? (
        <button
          className="absolute right-1 top-1 p-1 bg-black/60 rounded text-gray-300 hover:text-gray-200 hidden group-hover:block"
          onClick={(event) => {
            event.preventDefault();
            deletable(event);
          }}
          type="button"
        >
          <DeleteIcon />
        </button>
      ) : null}
    </Tag>
  );
}
