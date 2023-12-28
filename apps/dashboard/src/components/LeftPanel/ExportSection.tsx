import { useState } from "react";
import { flushSync } from "react-dom";
import { Button } from "../Button";
import { PngIcon } from "../icons/PngIcon";
import { SvgIcon } from "../icons/SvgIcon";
import { useOg } from "../OgEditor";
import { domToReactLike, exportToPng, exportToSvg } from "../../lib/export";
import { loadFonts } from "../../lib/fonts";

export function ExportSection() {
  const { rootRef, elements, setSelectedElement } = useOg()
  const [isLoading, setIsLoading] = useState(false)

  async function exportSvg(openInNewTab = true) {
    if (!rootRef.current) {
      return {}
    }

    flushSync(() => {
      setSelectedElement(null)
    })

    setIsLoading(true)

    const reactLike = domToReactLike(rootRef.current, 'This is a dynamic text')
    const fonts = await loadFonts(elements)
    const svg = await exportToSvg(reactLike, fonts)

    setIsLoading(false)

    if (openInNewTab) {
      const blob = new Blob([svg], { type: 'image/svg+xml' })
      const url = URL.createObjectURL(blob)
      window.open(url)
    }

    return { fonts, svg }
  }

  async function exportPng() {
    const { svg, fonts } = await exportSvg(false)

    setIsLoading(true)

    const png = await exportToPng(svg ?? '', fonts?.map(font => new Uint8Array(font.data)) ?? [])

    setIsLoading(false)

    const blob = new Blob([png], { type: 'image/png' })
    const url = URL.createObjectURL(blob)
    window.open(url)
  }

  return (
    <>
      <p className="text-xs text-gray-600">Export</p>
      <div className="grid grid-cols-1 gap-2 w-full">
        <Button icon={<SvgIcon />} isLoading={isLoading} onClick={() => exportSvg()}>Export as SVG</Button>
        <Button icon={<PngIcon />} isLoading={isLoading} onClick={() => exportPng()}>Export as PNG</Button>
      </div>
    </>
  )
}
