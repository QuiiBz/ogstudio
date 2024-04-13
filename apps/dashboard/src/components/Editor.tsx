"use client";
import { useParams } from "next/navigation";
import { OgEditor } from "./OgEditor";

export function Editor() {
  const { image } = useParams<{ image: string }>();

  return <OgEditor height={630} imageId={image} width={1200} />;
}
