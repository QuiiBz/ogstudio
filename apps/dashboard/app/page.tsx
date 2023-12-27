'use client'
import { OgPlayground } from "./_components/OgPlayground";
import { OGElement } from "./_lib/types";

const initialElements: OGElement[] = [
  {
    id: Math.random().toString(),
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
    <OgPlayground initialElements={initialElements} width={1200} height={630} />
  )
}
