import { describe, it, expect } from "vitest";
import {
  createElementId,
  createElement,
  createElementStyle,
  createImgElementStyle,
} from "../elements";

describe("createElementId", () => {
  it("should generate a random id", () => {
    const id = createElementId();
    expect(id).to.be.a("string");
    expect(id.length).toBe(9);

    const id2 = createElementId();
    expect(id2).not.toEqual(id);
  });
});

describe("createElement", () => {
  it("should fill id, x and y fields based on width and height", () => {
    const element = createElement({
      tag: "div",
      width: 100,
      height: 200,
    });

    expect(element.id).to.be.a("string");
    expect(element.id.length).toBe(9);

    // @ts-expect-error not sure what's going on here
    delete element.id;

    expect(element).toMatchInlineSnapshot(`
      {
        "height": 200,
        "tag": "div",
        "width": 100,
        "x": 550,
        "y": 215,
      }
    `);
  });
});

describe("createElementStyle", () => {
  it("should generate base style", () => {
    const style = createElementStyle({
      tag: "div",
      id: createElementId(),
      name: "Box",
      x: 10,
      y: 20,
      width: 100,
      height: 200,
      visible: true,
      rotate: 0,
      opacity: 80,
      backgroundColor: "#ffffff",
    });

    expect(style).toMatchInlineSnapshot(`
      {
        "background": "rgba(255, 255, 255, 0.8)",
        "display": "flex",
        "height": "200px",
        "left": "10px",
        "position": "absolute",
        "top": "20px",
        "width": "100px",
      }
    `);
  });

  it("should generate base style with rotation", () => {
    const style = createElementStyle({
      tag: "div",
      id: createElementId(),
      name: "Box",
      x: 10,
      y: 20,
      width: 100,
      height: 200,
      visible: true,
      rotate: 120,
      opacity: 80,
      backgroundColor: "#ffffff",
    });

    expect(style).toMatchInlineSnapshot(`
      {
        "background": "rgba(255, 255, 255, 0.8)",
        "display": "flex",
        "height": "200px",
        "left": "10px",
        "position": "absolute",
        "top": "20px",
        "transform": "rotate(120deg)",
        "width": "100px",
      }
    `);
  });

  describe("border", () => {
    it("should generate base style with border outside", () => {
      const style = createElementStyle({
        tag: "div",
        id: createElementId(),
        name: "Box",
        x: 10,
        y: 20,
        width: 100,
        height: 200,
        visible: true,
        rotate: 0,
        opacity: 80,
        border: {
          color: "blue",
          width: 2,
          style: "outside",
        },
        backgroundColor: "#ffffff",
      });

      expect(style).toMatchInlineSnapshot(`
        {
          "background": "rgba(255, 255, 255, 0.8)",
          "boxShadow": "0 0 0 2px blue",
          "display": "flex",
          "height": "200px",
          "left": "10px",
          "position": "absolute",
          "top": "20px",
          "width": "100px",
        }
      `);
    });

    it("should generate base style with border inside", () => {
      const style = createElementStyle({
        tag: "div",
        id: createElementId(),
        name: "Box",
        x: 10,
        y: 20,
        width: 100,
        height: 200,
        visible: true,
        rotate: 0,
        opacity: 80,
        border: {
          color: "green",
          width: 4,
          style: "inside",
        },
        backgroundColor: "#ffffff",
      });

      expect(style).toMatchInlineSnapshot(`
        {
          "background": "rgba(255, 255, 255, 0.8)",
          "boxShadow": "0 0 0 4px inset green",
          "display": "flex",
          "height": "200px",
          "left": "10px",
          "position": "absolute",
          "top": "20px",
          "width": "100px",
        }
      `);
    });
  });

  it("should generate base style with shadow", () => {
    const style = createElementStyle({
      tag: "div",
      id: createElementId(),
      name: "Box",
      x: 10,
      y: 20,
      width: 100,
      height: 200,
      visible: true,
      rotate: 0,
      opacity: 80,
      shadow: {
        color: "blue",
        width: 2,
        blur: 4,
        x: 2,
        y: 2,
      },
      backgroundColor: "#ffffff",
    });

    expect(style).toMatchInlineSnapshot(`
      {
        "background": "rgba(255, 255, 255, 0.8)",
        "boxShadow": "2px 2px 4px 2px blue",
        "display": "flex",
        "height": "200px",
        "left": "10px",
        "position": "absolute",
        "top": "20px",
        "width": "100px",
      }
    `);
  });

  it("should generate base style with border and shadodw", () => {
    const style = createElementStyle({
      tag: "div",
      id: createElementId(),
      name: "Box",
      x: 10,
      y: 20,
      width: 100,
      height: 200,
      visible: true,
      rotate: 0,
      opacity: 80,
      border: {
        color: "green",
        width: 4,
        style: "inside",
      },
      shadow: {
        color: "blue",
        width: 2,
        blur: 4,
        x: 2,
        y: 2,
      },
      backgroundColor: "#ffffff",
    });

    expect(style).toMatchInlineSnapshot(`
      {
        "background": "rgba(255, 255, 255, 0.8)",
        "boxShadow": "0 0 0 4px inset green, 2px 2px 4px 2px blue",
        "display": "flex",
        "height": "200px",
        "left": "10px",
        "position": "absolute",
        "top": "20px",
        "width": "100px",
      }
    `);
  });

  describe("p & span", () => {
    it("should generate style", () => {
      const style = createElementStyle({
        tag: "p",
        id: createElementId(),
        name: "Box",
        x: 10,
        y: 20,
        width: 100,
        height: 200,
        visible: true,
        rotate: 0,
        opacity: 80,
        content: "Hello",
        color: "#ffffff",
        fontFamily: "Inter",
        fontSize: 12,
        fontWeight: 400,
        lineHeight: 1,
        letterSpacing: 0,
        align: "left",
      });

      expect(style).toMatchInlineSnapshot(`
        {
          "color": "rgba(255, 255, 255, 0.8)",
          "fontFamily": "Inter",
          "fontSize": "12px",
          "fontWeight": 400,
          "height": "200px",
          "left": "10px",
          "letterSpacing": "0px",
          "lineHeight": 1,
          "marginBottom": 0,
          "marginTop": 0,
          "position": "absolute",
          "textAlign": "left",
          "top": "20px",
          "width": "100px",
        }
      `);
    });

    it("should generate style with shadow", () => {
      const style = createElementStyle({
        tag: "p",
        id: createElementId(),
        name: "Box",
        x: 10,
        y: 20,
        width: 100,
        height: 200,
        visible: true,
        rotate: 0,
        opacity: 80,
        shadow: {
          color: "blue",
          width: 2,
          blur: 4,
          x: 2,
          y: 2,
        },
        content: "Hello",
        color: "#ffffff",
        fontFamily: "Inter",
        fontSize: 12,
        fontWeight: 400,
        lineHeight: 1,
        letterSpacing: 0,
        align: "left",
      });

      expect(style).toMatchInlineSnapshot(`
        {
          "color": "rgba(255, 255, 255, 0.8)",
          "fontFamily": "Inter",
          "fontSize": "12px",
          "fontWeight": 400,
          "height": "200px",
          "left": "10px",
          "letterSpacing": "0px",
          "lineHeight": 1,
          "marginBottom": 0,
          "marginTop": 0,
          "position": "absolute",
          "textAlign": "left",
          "textShadow": "2px 2px 4px blue",
          "top": "20px",
          "width": "100px",
        }
      `);
    });
  });

  describe("div", () => {
    it("should generate style with radius", () => {
      const style = createElementStyle({
        tag: "div",
        id: createElementId(),
        name: "Box",
        x: 10,
        y: 20,
        width: 100,
        height: 200,
        visible: true,
        rotate: 0,
        opacity: 80,
        radius: 4,
        backgroundColor: "#ffffff",
      });

      expect(style).toMatchInlineSnapshot(`
        {
          "background": "rgba(255, 255, 255, 0.8)",
          "borderRadius": "4px",
          "display": "flex",
          "height": "200px",
          "left": "10px",
          "position": "absolute",
          "top": "20px",
          "width": "100px",
        }
      `);
    });

    describe("gradient", () => {
      it("should generate style with linear gradient", () => {
        const style = createElementStyle({
          tag: "div",
          id: createElementId(),
          name: "Box",
          x: 10,
          y: 20,
          width: 100,
          height: 200,
          visible: true,
          rotate: 0,
          opacity: 80,
          backgroundColor: "#ffffff",
          gradient: {
            start: "#ff0000",
            end: "#00ff00",
            angle: 45,
            type: "linear",
          },
        });

        expect(style).toMatchInlineSnapshot(`
          {
            "background": "linear-gradient(45deg, #ff0000, #00ff00)",
            "display": "flex",
            "height": "200px",
            "left": "10px",
            "position": "absolute",
            "top": "20px",
            "width": "100px",
          }
        `);
      });

      it("should generate style with radial gradient", () => {
        const style = createElementStyle({
          tag: "div",
          id: createElementId(),
          name: "Box",
          x: 10,
          y: 20,
          width: 100,
          height: 200,
          visible: true,
          rotate: 0,
          opacity: 80,
          backgroundColor: "#ffffff",
          gradient: {
            start: "#ff0000",
            end: "#00ff00",
            angle: 0,
            type: "radial",
          },
        });

        expect(style).toMatchInlineSnapshot(`
          {
            "background": "radial-gradient(#ff0000, #00ff00)",
            "display": "flex",
            "height": "200px",
            "left": "10px",
            "position": "absolute",
            "top": "20px",
            "width": "100px",
          }
        `);
      });
    });
  });
});

describe("createImgElementStyle", () => {
  it("should generate style with image and cover", () => {
    const style = createImgElementStyle({
      tag: "div",
      id: createElementId(),
      name: "Box",
      x: 10,
      y: 20,
      width: 100,
      height: 200,
      visible: true,
      rotate: 0,
      opacity: 80,
      backgroundColor: "#ffffff",
      backgroundImage: "https://via.placeholder.com/150",
      backgroundSize: "cover",
    });

    expect(style).toMatchInlineSnapshot(`
      {
        "objectFit": "cover",
      }
    `);
  });

  it("should generate style with image and contain", () => {
    const style = createImgElementStyle({
      tag: "div",
      id: createElementId(),
      name: "Box",
      x: 10,
      y: 20,
      width: 100,
      height: 200,
      visible: true,
      rotate: 0,
      opacity: 80,
      backgroundColor: "#ffffff",
      backgroundImage: "https://via.placeholder.com/150",
      backgroundSize: "contain",
    });

    expect(style).toMatchInlineSnapshot(`
      {
        "objectFit": "contain",
      }
    `);
  });
});
