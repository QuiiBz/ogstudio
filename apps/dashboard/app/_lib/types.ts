import { FONTS } from "./fonts"

export type OGElement = (OGPElement | OGDynamicElement | OGDivElement)
  & {
    id: string
    x: number
    y: number
    width: number
    height: number
    visible: boolean
    rotate: number
    opacity: number
    border?: {
      color: string
      width: number
      style: 'outside' | 'inside'
    }
    shadow?: {
      color: string
      width: number
      blur: number
      x: number
      y: number
    }
  }

export type OGPElement = {
  tag: 'p'
  content: string
  color: string
  fontFamily: typeof FONTS[number]
  fontWeight: number
  fontSize: number
  lineHeight: number
  align: 'left' | 'center' | 'right'
}

export type OGDynamicElement = Omit<OGPElement, 'tag' | 'content'> & {
  tag: 'span'
}

export type OGDivElement = {
  tag: 'div'
  radius?: number
  backgroundColor: string
  gradient?: {
    start: string
    end: string
    angle: number
    type: 'linear' | 'radial'
  }
  backgroundImage?: string
  backgroundSize?: 'cover' | 'contain'
}
