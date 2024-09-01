import { describe, it, expect } from "vitest";
import { loadFonts, maybeLoadFont } from "../fonts";
import { createElementId } from "../elements";

describe("maybeLoadFont", () => {
  it("should load a font", () => {
    maybeLoadFont("Roboto", 400);

    expect(document.head.innerHTML).toMatchInlineSnapshot(
      `
      "<style id="font-roboto-400">
          @font-face {
            font-family: "Roboto";
            src: url("https://cdn.jsdelivr.net/fontsource/fonts/roboto@latest/latin-400-normal.woff") format("woff");
            font-weight: 400;
            font-style: normal;
          }
        </style>"
    `,
    );
  });

  it("should only load a font once", () => {
    maybeLoadFont("Roboto", 400);
    maybeLoadFont("Roboto", 400);

    expect(document.head.innerHTML).toMatchInlineSnapshot(
      `
      "<style id="font-roboto-400">
          @font-face {
            font-family: "Roboto";
            src: url("https://cdn.jsdelivr.net/fontsource/fonts/roboto@latest/latin-400-normal.woff") format("woff");
            font-weight: 400;
            font-style: normal;
          }
        </style>"
    `,
    );
  });

  it("should load multiple fonts", () => {
    maybeLoadFont("Roboto", 400);
    maybeLoadFont("Roboto", 500);
    maybeLoadFont("Roboto", 700);

    expect(document.head.innerHTML).toMatchInlineSnapshot(
      `
      "<style id="font-roboto-400">
          @font-face {
            font-family: "Roboto";
            src: url("https://cdn.jsdelivr.net/fontsource/fonts/roboto@latest/latin-400-normal.woff") format("woff");
            font-weight: 400;
            font-style: normal;
          }
        </style><style id="font-roboto-500">
          @font-face {
            font-family: "Roboto";
            src: url("https://cdn.jsdelivr.net/fontsource/fonts/roboto@latest/latin-500-normal.woff") format("woff");
            font-weight: 500;
            font-style: normal;
          }
        </style><style id="font-roboto-700">
          @font-face {
            font-family: "Roboto";
            src: url("https://cdn.jsdelivr.net/fontsource/fonts/roboto@latest/latin-700-normal.woff") format("woff");
            font-weight: 700;
            font-style: normal;
          }
        </style>"
    `,
    );
  });
});

describe("loadFonts", () => {
  it("should load fonts from elements", async () => {
    const data = await loadFonts([
      {
        id: createElementId(),
        tag: "p",
        name: "Text",
        x: 0,
        y: 0,
        width: 100,
        height: 50,
        visible: true,
        rotate: 0,
        blur: 0,
        content: "Text",
        color: "#000000",
        fontFamily: "Inter",
        fontWeight: 400,
        lineHeight: 1,
        letterSpacing: 0,
        fontSize: 50,
        align: "left",
      },
      {
        id: createElementId(),
        tag: "p",
        name: "Text",
        x: 0,
        y: 0,
        width: 100,
        height: 50,
        visible: true,
        rotate: 0,
        blur: 0,
        content: "Text",
        color: "#000000",
        fontFamily: "Roboto",
        fontWeight: 500,
        lineHeight: 1,
        letterSpacing: 0,
        fontSize: 50,
        align: "left",
      },
      {
        id: createElementId(),
        tag: "p",
        name: "Text",
        x: 0,
        y: 0,
        width: 100,
        height: 50,
        visible: true,
        rotate: 0,
        blur: 0,
        content: "Text",
        color: "#000000",
        fontFamily: "Monaspace Radon",
        fontWeight: 500,
        lineHeight: 1,
        letterSpacing: 0,
        fontSize: 50,
        align: "left",
      },
    ]);

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
        {
          "data": ArrayBuffer [],
          "name": "Monaspace Radon",
          "weight": 500,
        },
      ]
    `);
  });
});
