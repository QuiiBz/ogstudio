import { createElementId } from "./elements";
import type { OGElement } from "./types";

export interface Template {
  name: string
  elements: OGElement[]
}

/**
 * The list of all available templates. Each template is composed of an array of
 * elements and a name.
 */
export const TEMPLATES = [
  {
    name: 'Default',
    elements: [{
      id: createElementId(),
      tag: 'div',
      name: 'Box',
      x: 0,
      y: 0,
      width: 1200,
      height: 630,
      visible: true,
      rotate: 0,
      opacity: 100,
      backgroundColor: '#ffffff',
    }]
  }
] satisfies Template[]
