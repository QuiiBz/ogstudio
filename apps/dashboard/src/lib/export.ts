import { Resvg, initWasm } from "@resvg/resvg-wasm"
import satori from "satori"
import { toast } from "sonner"

let wasmInitialized = false

export interface ReactElements {
  type: string
  props: {
    style?: Record<string, string>
    children?: (ReactElements | string)[]
  }
}

/**
 * Transform a DOM node to a React elements structure, since we're not
 * running a JSX transformer.
 *
 * See https://github.com/vercel/satori#use-without-jsx
 */
export function domToReactElements(element: Element, dynamicTextReplace: string): ReactElements {
  const props: Record<string, unknown> = {}
  const children: ReactElements['props']['children'] = []

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
    children.push(domToReactElements(child, dynamicTextReplace))
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

/**
 * Export React elements to an SVG string, using the provided fonts.
 */
export async function exportToSvg(reactElements: ReactElements, fonts: { name: string, data: ArrayBuffer, weight: number }[]): Promise<string> {
  try {
    const svg = await satori(
      // @ts-expect-error wtf?
      reactElements,
      {
        width: 1200,
        height: 630,
        fonts,
      },
    )

    return svg
  } catch (error) {
    console.error(error)

    // Firefox only recently added support for the Intl.Segmenter API
    // See https://caniuse.com/mdn-javascript_builtins_intl_segmenter
    // See https://github.com/QuiiBz/ogstudio/issues/19
    if (error instanceof Error && error.message.includes('Intl.Segmenter')) {
      toast.error('Your browser does not support a required feature (Intl.Segmenter). Please update to the latest version.')
    }

    return ''
  }
}

/**
 * Export an SVG string to a PNG Uint8Array, using the provided font buffers.
 */
export async function exportToPng(svg: string, fonts: Uint8Array[]): Promise<Uint8Array> {
  if (!wasmInitialized) {
    // eslint-disable-next-line turbo/no-undeclared-env-vars -- will always be set when running the tests
    if (process.env.VITEST_POOL_ID) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-var-requires, @typescript-eslint/no-unsafe-member-access -- we know what we're doing
      await initWasm(require('node:fs/promises').readFile('node_modules/@resvg/resvg-wasm/index_bg.wasm'))
    } else {
      await initWasm(fetch('https://unpkg.com/@resvg/resvg-wasm/index_bg.wasm'))
    }
    wasmInitialized = true
  }

  const resvgJS = new Resvg(svg, {
    font: {
      fontBuffers: fonts,
    }
  })
  const pngData = resvgJS.render()
  const pngBuffer = pngData.asPng()

  return pngBuffer
}
