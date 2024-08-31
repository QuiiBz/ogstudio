"use client";
import { useSearchParams } from "next/navigation";
import { OgEditor } from "./OgEditor";

interface EditorProps {
  isSplash?: boolean;
}

export function Editor({ isSplash }: EditorProps) {
  const searchParams = useSearchParams();
  const imageId = searchParams.get("i");

  return (
    <OgEditor
      height={630}
      imageId={imageId ?? (isSplash ? "splash" : "")}
      width={1200}
    />
  );
}
