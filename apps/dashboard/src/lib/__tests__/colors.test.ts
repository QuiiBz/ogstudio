import { describe, it, expect } from "vitest";
import { hexToRgba } from "../colors";

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
