import type { Font } from "./fonts";

export type OGElement = (OGPElement | OGDynamicElement | OGDivElement) & {
  id: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  visible: boolean;
  rotate: number;
  border?: {
    color: string;
    width: number;
    style: "outside" | "inside";
  };
  shadow?: {
    color: string;
    width: number;
    blur: number;
    x: number;
    y: number;
  };
};

export interface OGPElement {
  tag: "p";
  content: string;
  color: string;
  fontFamily: Font;
  fontWeight: number;
  fontSize: number;
  lineHeight: number;
  letterSpacing: number;
  align: "left" | "center" | "right";
}

export type OGDynamicElement = Omit<OGPElement, "tag"> & {
  tag: "span";
};

export interface OGDivElement {
  tag: "div";
  radius?: number;
  backgroundColor: string;
  gradient?: {
    start: string;
    end: string;
    angle: number;
    type: "linear" | "radial";
  };
  backgroundImage?: string;
  backgroundSize?: "cover" | "contain";
}
