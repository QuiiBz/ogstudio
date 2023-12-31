import fs from "node:fs/promises";
import path from "node:path";
import { describe, it, expect } from "vitest";
import {
  domToReactElements,
  exportToPng,
  exportToSvg,
  renderToImg,
} from "../export";
import { createElementId } from "../elements";

describe("domToReactElements", () => {
  it("should transform a dom node to react elements", () => {
    const element = document.createElement("div");
    element.innerHTML = "Hello world";
    element.style.color = "red";

    const output = domToReactElements(element, "");
    expect(output).toMatchInlineSnapshot(`
      {
        "props": {
          "children": [
            "Hello world",
          ],
          "style": {
            "color": "red",
          },
        },
        "type": "div",
      }
    `);
  });

  it("should transform a dom node to react elements with text children", () => {
    const element = document.createElement("div");
    element.innerHTML = "Hello world";

    const output = domToReactElements(element, "");
    expect(output).toMatchInlineSnapshot(`
      {
        "props": {
          "children": [
            "Hello world",
          ],
          "style": {},
        },
        "type": "div",
      }
    `);
  });

  it("should transform a dom node to react elements with styles", () => {
    const element = document.createElement("div");
    element.style.color = "red";
    element.style.backgroundColor = "blue";

    const output = domToReactElements(element, "");
    expect(output).toMatchInlineSnapshot(`
      {
        "props": {
          "children": [],
          "style": {
            "background-color": "blue",
            "color": "red",
          },
        },
        "type": "div",
      }
    `);
  });
});

describe("exportToSvg", () => {
  it("should export a basic rectangle to svg", async () => {
    const svg = await exportToSvg(
      {
        type: "div",
        props: {
          style: {
            display: "flex",
            width: "100%",
            height: "100%",
            backgroundColor: "#ffff00",
          },
        },
      },
      [],
    );
    expect(svg).toMatchInlineSnapshot(
      `"<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg"><mask id="satori_om-id"><rect x="0" y="0" width="1200" height="630" fill="#fff"/></mask><rect x="0" y="0" width="1200" height="630" fill="#ffff00"/></svg>"`,
    );
  });

  it.todo("should export text to svg");
});

describe("exportToPng", () => {
  it("should export a basic rectangle to png", async () => {
    const png = await exportToPng(
      await exportToSvg(
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              width: "100%",
              height: "100%",
              backgroundColor: "#ffff00",
            },
          },
        },
        [],
      ),
      [],
    );
    expect(png).toMatchSnapshot();

    // To make debugging easier
    const filePath = path.join(__dirname, "basicRectangle.png");
    await fs.writeFile(filePath, png);
  });

  it.todo("should export text to png");
});

describe("renderToImg", () => {
  it("should render to a base64 data url", async () => {
    const data = await renderToImg([
      {
        tag: "p",
        id: createElementId(),
        name: "Text",
        width: 100,
        height: 50,
        x: 0,
        y: 0,
        visible: true,
        rotate: 0,
        opacity: 100,
        content: "Text",
        color: "#000000",
        fontFamily: "Inter",
        fontWeight: 400,
        lineHeight: 1,
        letterSpacing: 0,
        fontSize: 50,
        align: "left",
      },
    ]);
    expect(data).toMatchSnapshot();
  });

  it("should not render non-visible elements", async () => {
    const data = await renderToImg([
      {
        tag: "p",
        id: createElementId(),
        name: "Text",
        width: 100,
        height: 50,
        x: 0,
        y: 0,
        visible: false,
        rotate: 0,
        opacity: 100,
        content: "Text",
        color: "#000000",
        fontFamily: "Inter",
        fontWeight: 400,
        lineHeight: 1,
        letterSpacing: 0,
        fontSize: 50,
        align: "left",
      },
    ]);
    expect(data).toMatchSnapshot();
  });
});
