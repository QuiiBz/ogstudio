import { describe, it, expect } from "vitest";
import { loadFonts, maybeLoadFont } from "../fonts";
import { createElementId } from "../elements";

describe('maybeLoadFont', () => {
  it('should load a font', () => {
    maybeLoadFont('Roboto', 400)

    expect(document.head.innerHTML).toMatchInlineSnapshot(`"<link id="font-Roboto-400" rel="stylesheet" href="https://fonts.bunny.net/css?family=roboto:400">"`)
  })

  it('should only load a font once', () => {
    maybeLoadFont('Roboto', 400)
    maybeLoadFont('Roboto', 400)

    expect(document.head.innerHTML).toMatchInlineSnapshot(`"<link id="font-Roboto-400" rel="stylesheet" href="https://fonts.bunny.net/css?family=roboto:400">"`)
  })

  it('should load multiple fonts', () => {
    maybeLoadFont('Roboto', 400)
    maybeLoadFont('Roboto', 500)
    maybeLoadFont('Roboto', 700)

    expect(document.head.innerHTML).toMatchInlineSnapshot(`"<link id="font-Roboto-400" rel="stylesheet" href="https://fonts.bunny.net/css?family=roboto:400"><link id="font-Roboto-500" rel="stylesheet" href="https://fonts.bunny.net/css?family=roboto:500"><link id="font-Roboto-700" rel="stylesheet" href="https://fonts.bunny.net/css?family=roboto:700">"`)
  })
})

describe('loadFonts', () => {
  it('should load fonts from elements', async () => {
    const data = await loadFonts([
      {
        id: createElementId(),
        tag: 'p',
        name: 'Text',
        x: 0,
        y: 0,
        width: 100,
        height: 50,
        visible: true,
        rotate: 0,
        opacity: 100,
        content: 'Text',
        color: '#000000',
        fontFamily: 'Inter',
        fontWeight: 400,
        lineHeight: 1,
        letterSpacing: 0,
        fontSize: 50,
        align: 'left',
      },
      {
        id: createElementId(),
        tag: 'p',
        name: 'Text',
        x: 0,
        y: 0,
        width: 100,
        height: 50,
        visible: true,
        rotate: 0,
        opacity: 100,
        content: 'Text',
        color: '#000000',
        fontFamily: 'Roboto',
        fontWeight: 500,
        lineHeight: 1,
        letterSpacing: 0,
        fontSize: 50,
        align: 'left',
      }
    ])

    expect(data).toMatchInlineSnapshot(`
      [
        {
          "data": ArrayBuffer [],
          "name": "Inter",
          "weight": 400,
        },
        {
          "data": ArrayBuffer [],
          "name": "Roboto",
          "weight": 500,
        },
      ]
    `)
  })
})
