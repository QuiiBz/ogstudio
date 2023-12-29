import { useState } from "react";
import { flushSync } from "react-dom";
import { toast } from "sonner";
import { Button } from "../forms/Button";
import { PngIcon } from "../icons/PngIcon";
import { SvgIcon } from "../icons/SvgIcon";
import { useOg } from "../OgEditor";
import { domToReactElements, exportToPng, exportToSvg } from "../../lib/export";
import type { FontData } from "../../lib/fonts";
import { loadFonts } from "../../lib/fonts";

export function ExportSection() {
  const { rootRef, elements, setSelectedElement } = useOg()
  const [isLoading, setIsLoading] = useState(false)

  async function exportSvg(showProgress = true) {
    flushSync(() => {
      setSelectedElement(null)
    })

    async function run() {
      setIsLoading(true)

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- rootRef is always defined
      const reactElements = domToReactElements(rootRef.current!, 'This is a dynamic text')
      const fonts = await loadFonts(elements)
      const svg = await exportToSvg(reactElements, fonts)

      setIsLoading(false)

      return { fonts, svg }
    }

    return new Promise<{
      fonts: FontData[];
      svg: string;
    }>((resolve, reject) => {
      if (showProgress) {
        let svg: string

        toast.promise(run(), {
          loading: 'Exporting to SVG...',
          success: (data) => {
            resolve(data)
            svg = data.svg

            return 'SVG exported!'
          },
          action: {
            label: 'Download',
            onClick: () => {
              const blob = new Blob([svg], { type: 'image/svg+xml' })
              const url = URL.createObjectURL(blob)
              window.open(url)
            }
          }
        });
      }

      run().then(resolve).catch(reject)
    })
  }

  async function exportPng() {
    const { svg, fonts } = await exportSvg(false)

    let png: Uint8Array

    async function run() {
      setIsLoading(true)

      png = await exportToPng(svg, fonts.map(font => new Uint8Array(font.data)))

      setIsLoading(false)
    }

    toast.promise(run(), {
      loading: 'Exporting to PNG...',
      success: 'PNG exported!',
      action: {
        label: 'Download',
        onClick: () => {
          const blob = new Blob([png], { type: 'image/png' })
          const url = URL.createObjectURL(blob)
          window.open(url)
        }
      }
    });
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
