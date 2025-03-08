import { useEffect, useState } from "react";
import { useZoomStore } from "../../stores/zoomStore";

export function useAdjustedZoom() {
  const zoom = useZoomStore((state) => state.zoom);
  const [zoomFactor, setZoomFactor] = useState(1);

  useEffect(() => {
    function onResize() {
      const screenWidth = window.innerWidth;
      const editorWidth = 1200;
      const editorWidthWithPanels = editorWidth + 300 * 2;

      if (screenWidth < editorWidthWithPanels) {
        setZoomFactor(screenWidth / (editorWidthWithPanels + 200));
      } else {
        setZoomFactor(1);
      }
    }

    onResize();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (zoom / 100) * zoomFactor;
}
