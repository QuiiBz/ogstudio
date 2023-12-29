import usePromise from "react-promise-suspense"
import { createElementStyle } from "../lib/elements"
import { exportToSvg } from "../lib/export"
import { loadFonts } from "../lib/fonts"
import type { OGElement } from "../lib/types"

async function loadOgImage(elements: OGElement[]) {
  const fonts = await loadFonts(elements)
  const reactElements = {
    type: 'div',
    props: {
      style: {
        display: 'flex',
        width: '100%',
        height: '100%',
      },
      children: elements.map(element => ({
        type: element.tag,
        props: {
          style: createElementStyle(element),
          ...(element.tag === 'p' ? { children: element.content } : {}),
        },
      }))
    }
  }

  const svg = await exportToSvg(reactElements, fonts)
  return `data:image/svg+xml;base64,${btoa(svg)}`
}

interface OgImageProps {
  elements: OGElement[]
}

export function OgImage({ elements }: OgImageProps) {
  const src = usePromise(loadOgImage, [elements])

  return <img alt="" src={src} />
}
