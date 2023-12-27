import { Resvg, initWasm } from "@resvg/resvg-wasm"
import satori from "satori"

let wasmInitialized = false

export async function exportToSvg(reactLike: Record<string, unknown>, fonts: Array<{ name: string, data: ArrayBuffer, weight: number }>): Promise<string> {
  const now = Date.now()

  const svg = await satori(
    // @ts-expect-error wtf?
    reactLike,
    {
      width: 1200,
      height: 630,
      fonts,
    },
  )

  console.log('satori', Date.now() - now)
  return svg
}

export async function exportToPng(svg: string, fonts: Array<Uint8Array>): Promise<Uint8Array> {
  const now = Date.now()

  if (!wasmInitialized) {
    await initWasm(fetch('https://unpkg.com/@resvg/resvg-wasm/index_bg.wasm'))
    wasmInitialized = true
  }

  const resvgJS = new Resvg(svg, {
    font: {
      fontBuffers: fonts,
    }
  })
  const pngData = resvgJS.render()
  const pngBuffer = pngData.asPng()

  console.log('resvg', Date.now() - now)
  return pngBuffer
}
