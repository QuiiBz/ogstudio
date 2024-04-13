import { useEffect } from "react";
import { maybeLoadFont, type Font } from "../lib/fonts";

interface FontPreviewProps {
  font: Font;
}

export function FontPreview({ font }: FontPreviewProps) {
  useEffect(() => {
    maybeLoadFont(font, 400);
  }, [font]);

  return <p style={{ fontFamily: font }}>{font}</p>;
}
