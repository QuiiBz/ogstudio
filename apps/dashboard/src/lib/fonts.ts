import type { OGElement } from "./types";

export interface Font {
  name: string;
  weights: number[];
}

export interface FontData {
  name: string;
  data: ArrayBuffer;
  weight: number;
}

const fontsCache = new Map<string, FontData>();

/**
 * Default fonts that are available in the editor.
 */
export const DEFAULT_FONTS = [
  "Roboto",
  "Open Sans",
  "Montserrat",
  "Lato",
  "Poppins",
  "Inter",
  "Oswald",
  "Raleway",
  "Nunito",
  "Ubuntu",
];

/**
 * Adds the font stylesheet to the document body.
 *
 * The font is loaded asynchronously, so it may not be available immediately
 * and the caller should make sure to wait for the font to be loaded before
 * using it.
 */
export function maybeLoadFont(font: string, weight: number) {
  const fontID = font.toLowerCase().replaceAll(" ", "-");
  const fontURL = getFontURL(font, weight);
  const id = `font-${fontID}-${weight}`;

  if (document.getElementById(id)) {
    return;
  }

  const style = document.createElement("style");
  style.id = id;

  const fontFace = `
    @font-face {
      font-family: "${font}";
      src: url("${fontURL}") format("woff");
      font-weight: ${weight};
      font-style: normal;
    }
  `;

  style.appendChild(document.createTextNode(fontFace));
  document.head.appendChild(style);
}

/**
 * Load all fonts used in the given elements from sourcefonts. The fonts are
 * returned as an `ArrayBuffer`, along with the font name and weight.
 */
export async function loadFonts(elements: OGElement[]): Promise<FontData[]> {
  // TODO: dedupe fonts
  return Promise.all(
    elements
      .filter((element) => element.tag === "p" || element.tag === "span")
      .map(async (element) => {
        const cacheKey = `${element.fontFamily}-${element.fontWeight}`;
        const fontCache = fontsCache.get(cacheKey);

        if (fontCache) {
          return fontCache;
        }

        const data = await fetch(
          getFontURL(element.fontFamily, element.fontWeight),
        ).then((response) => response.arrayBuffer());

        const fontData: FontData = {
          name: element.fontFamily,
          data,
          weight: element.fontWeight,
        };

        fontsCache.set(cacheKey, fontData);
        return fontData;
      }),
  );
}

/**
 * Get a list of all available fonts from Fontsource.
 */
export async function getFontData(): Promise<Font[]> {
  interface FontsourceFont {
    family: string;
    weights: number[];
    styles: string[];
    defSubset: string;
  }

  const response = await fetch("https://api.fontsource.org/v1/fonts", {
    cache: "no-store",
  });
  const data = (await response.json()) as FontsourceFont[];

  return data
    .filter(({ styles }) => styles.includes("normal"))
    .filter(({ defSubset }) => defSubset === "latin")
    .map((font) => ({
      name: font.family,
      weights: font.weights,
    }));
}

export function getFontURL(fontName: string, weight: number) {
  const fontID = fontName.toLowerCase().replaceAll(" ", "-");
  return `https://cdn.jsdelivr.net/fontsource/fonts/${fontID}@latest/latin-${weight}-normal.woff`;
}
