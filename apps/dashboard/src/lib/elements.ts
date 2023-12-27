import type { OGElement } from "./types";

export function createElementId() {
  return Math.random().toString(36).substr(2, 9);
}

/**
 * Create a new element with a random ID and automatically centered on the canvas.
 */
export function createElement(element: Partial<OGElement>): OGElement {
  // @ts-expect-error typescript is not smart enough
  return {
    ...element,
    id: createElementId(),
    x: (1200 - (element.width ?? 0)) / 2,
    y: (630 - (element.height ?? 0)) / 2,
  }
}
