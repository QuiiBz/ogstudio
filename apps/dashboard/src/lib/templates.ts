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
    elements: [
      {
        "tag": "div",
        "id": createElementId(),
        "name": "Box",
        "x": 0,
        "y": 0,
        "width": 1200,
        "height": 630,
        "visible": true,
        "rotate": 0,
        "opacity": 100,
        "backgroundColor": "#ffffff",
        "gradient": {
          "start": "#595cff",
          "end": "#c6f8ff",
          "angle": 195,
          "type": "linear"
        }
      },
      {
        "tag": "p",
        "id": createElementId(),
        "name": "Text",
        "x": 95,
        "y": 284,
        "width": 643,
        "height": 131,
        "visible": true,
        "rotate": 0,
        "opacity": 100,
        "content": "OG Studio",
        "color": "#0d0f45",
        "fontFamily": "Montserrat",
        "fontWeight": 600,
        "lineHeight": 1,
        "letterSpacing": 0,
        "fontSize": 120,
        "align": "left"
      },
      {
        "tag": "p",
        "id": createElementId(),
        "name": "Text",
        "x": 96,
        "y": 429,
        "width": 597,
        "height": 138,
        "visible": true,
        "rotate": 0,
        "opacity": 70,
        "content": "Image builder",
        "color": "#0d0f45",
        "fontFamily": "Montserrat",
        "fontWeight": 600,
        "lineHeight": 1,
        "letterSpacing": 0,
        "fontSize": 80,
        "align": "left"
      },
      {
        "tag": "div",
        "id": createElementId(),
        "name": "Rounded box",
        "x": 956,
        "y": -78,
        "width": 307,
        "height": 307,
        "visible": true,
        "rotate": 0,
        "opacity": 10,
        "backgroundColor": "#000000",
        "radius": 999
      },
      {
        "tag": "div",
        "id": createElementId(),
        "name": "Rounded box",
        "x": 1026,
        "y": -29,
        "width": 195,
        "height": 195,
        "visible": true,
        "rotate": 0,
        "opacity": 10,
        "backgroundColor": "#000000",
        "radius": 999
      }
    ],
  }
] satisfies Template[]
