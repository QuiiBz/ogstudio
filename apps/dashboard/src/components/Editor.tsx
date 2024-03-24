"use client";
import { useSearchParams } from "next/navigation";
import { OgEditor } from "./OgEditor";

export function Editor() {
  const searchParams = useSearchParams();
  const image = searchParams.get("i");

  return <OgEditor height={630} imageId={image ?? "splash"} width={1200} />;
}
