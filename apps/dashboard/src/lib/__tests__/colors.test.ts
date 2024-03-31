import { describe, it, expect } from "vitest";
import { hexAlphaToRgba, hexToRgba } from "../colors";

describe("hexToRgba", () => {
  it("should convert black hex to rgba", () => {
    expect(hexToRgba("#000000", 20)).toEqual("rgba(0, 0, 0, 0.2)");
  });

  it("should convert white hex to rgba", () => {
    expect(hexToRgba("#ffffff", 80)).toEqual("rgba(255, 255, 255, 0.8)");
  });

  it("should convert hex to rgba", () => {
    expect(hexToRgba("#EB57FF", 100)).toEqual("rgba(235, 87, 255, 1)");
  });
});

describe("hexAlphaToRgba", () => {
  it("should convert black hex to rgba", () => {
    expect(hexAlphaToRgba("#000000FF")).toEqual("rgba(0, 0, 0, 1)");
  });

  it("should convert white hex to rgba", () => {
    expect(hexAlphaToRgba("#ffffffff")).toEqual("rgba(255, 255, 255, 1)");
  });

  it("should convert hex to rgba", () => {
    expect(hexAlphaToRgba("#EB57FF80")).toEqual("rgba(235, 87, 255, 0.5)");
  });
});
