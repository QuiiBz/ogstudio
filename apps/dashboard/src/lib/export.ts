import { Resvg, initWasm } from "@resvg/resvg-wasm"
import satori from "satori"

let wasmInitialized = false

export function domToReactLike(element: Element, dynamicTextReplace: string): Record<string, unknown> {
  const props: Record<string, unknown> = {}
  const children = []

  if (element instanceof HTMLElement) {
    const style: Record<string, string> = {}
    const declarations = element.style.cssText.split(/;( |$)/)

    for (const declaration of declarations) {
      const [property, value] = declaration.split(/:(.*)/)

      if (property && value) {
        let finalValue = value.trim()

        if (property === 'box-shadow' && finalValue.startsWith('rgb(')) {
          let rgbValue: string | undefined

          finalValue = finalValue.replace(/rgb\((.*)\)/, (_, rgb) => {
            rgbValue = rgb as string
            return ''
          })

          if (rgbValue) {
            finalValue += ` rgb(${rgbValue})`
          }
        }

        style[property] = finalValue
      }
    }

    props.style = style
  }

  for (const child of element.children) {
    children.push(domToReactLike(child, dynamicTextReplace))
  }

  if (children.length === 0 && element.textContent) {
    if (element.textContent === '[dynamic text]') {
      children.push(dynamicTextReplace)
    } else {
      children.push(element.textContent)
    }
  }

  return {
    type: element.tagName.toLowerCase(),
    props: {
      ...props,
      children,
    },
  }
}


export async function exportToSvg(reactLike: Record<string, unknown>, fonts: { name: string, data: ArrayBuffer, weight: number }[]): Promise<string> {
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

export async function exportToPng(svg: string, fonts: Uint8Array[]): Promise<Uint8Array> {
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
