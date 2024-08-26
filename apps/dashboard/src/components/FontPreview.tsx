import { useEffect } from "react";
import { maybeLoadFont } from "../lib/fonts";

interface FontPreviewProps {
  font: string;
}

export function FontPreview({ font }: FontPreviewProps) {
  useEffect(() => {
    maybeLoadFont(font, 400);
  }, [font]);

  return <p style={{ fontFamily: font }}>{font}</p>;
}
