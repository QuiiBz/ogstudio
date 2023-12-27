import { useState } from "react";
import { flushSync } from "react-dom";
import { Button } from "../Button";
import { PngIcon } from "../icons/PngIcon";
import { SvgIcon } from "../icons/SvgIcon";
import { useOg } from "../OgPlayground";
import { domToReactLike, exportToPng, exportToSvg } from "../../lib/export";

export function ExportSection() {
  const { rootRef, elements, setSelectedElement } = useOg()
  const [isLoading, setIsLoading] = useState(false)

  async function getFonts() {
    return Promise.all(elements.filter(element => element.tag === 'p' || element.tag === 'span').map(async element => {
      // @ts-expect-error -- wrong inference
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access -- wrong inference
      const fontName = element.fontFamily.toLowerCase().replace(' ', '-')
      // @ts-expect-error -- wrong inference
      const data = await fetch(`https://fonts.bunny.net/${fontName}/files/${fontName}-latin-${element.fontWeight}-normal.woff`).then(response => response.arrayBuffer())

      return {
        // @ts-expect-error -- wrong inference
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- wrong inference
        name: element.fontFamily,
        data,
        // @ts-expect-error -- wrong inference
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- wrong inference
        weight: element.fontWeight,
      }
    }))
  }

  async function exportSvg(openInNewTab = true) {
    if (!rootRef.current) {
      return {}
    }

    flushSync(() => {
      setSelectedElement(null)
    })

    setIsLoading(true)

    const reactLike = domToReactLike(rootRef.current, 'This is a dynamic text')
    const fonts = await getFonts()
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
