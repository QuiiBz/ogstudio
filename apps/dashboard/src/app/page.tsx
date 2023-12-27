'use client'
import { OgEditor } from "../components/OgEditor";
import { createElementId } from "../lib/elements";
import type { OGElement } from "../lib/types";

/**
 * The initial elements to render in the editor.
 *
 * It only contains a single element, a white background that
 * takes the entire width and height of the editor.
 */
const initialElements: OGElement[] = [
  {
    id: createElementId(),
    tag: 'div',
    x: 0,
    y: 0,
    width: 1200,
    height: 630,
    visible: true,
    rotate: 0,
    opacity: 100,
    backgroundColor: '#ffffff',
  },
]

export default function Home() {
  return (
    <OgEditor height={630} initialElements={initialElements} width={1200} />
  )
}
