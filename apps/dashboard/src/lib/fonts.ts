import type { OGElement } from "./types";

export const FONTS = [
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
] as const;

export type Font = (typeof FONTS)[number];

export const FONT_WEIGHTS = {
  Roboto: [100, 300, 400, 500, 700, 900],
  "Open Sans": [300, 400, 600, 700, 800],
  Montserrat: [100, 200, 300, 400, 500, 600, 700, 800, 900],
  Lato: [100, 300, 400, 700, 900],
  Poppins: [100, 200, 300, 400, 500, 600, 700, 800, 900],
  Inter: [100, 200, 300, 400, 500, 600, 700, 800, 900],
  Oswald: [200, 300, 400, 500, 600, 700],
  Raleway: [100, 200, 300, 400, 500, 600, 700, 800, 900],
  Nunito: [200, 300, 400, 500, 600, 700, 800, 900],
  Ubuntu: [300, 400, 500, 700],
} satisfies Record<Font, number[]>;

/**
 * Try to load a font from Bunny Fonts, if the font is not already loaded.
 * The font is loaded asynchronously, so it may not be available immediately
 * and the caller should make sure to wait for the font to be loaded before
 * using it.
 */
export function maybeLoadFont(font: string, weight: number) {
  const id = `font-${font}-${weight}`;

  if (document.getElementById(id)) {
    return;
  }

  const link = document.createElement("link");
  link.id = id;
  link.rel = "stylesheet";
  link.href = `https://fonts.bunny.net/css?family=${font
    .toLowerCase()
    .replace(" ", "-")}:${weight}`;
  document.head.appendChild(link);
}

export interface FontData {
  name: string;
  data: ArrayBuffer;
  weight: number;
}

/**
 * Load all fonts used in the given elements from Bunny Fonts. The fonts are
 * returned as an `ArrayBuffer`, along with the font name and weight.
 */
export async function loadFonts(elements: OGElement[]): Promise<FontData[]> {
  // TODO: dedupe fonts
  return Promise.all(
    elements
      .filter((element) => element.tag === "p" || element.tag === "span")
      .map(async (element) => {
        // @ts-expect-error -- wrong inference
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access -- wrong inference
        const fontName = element.fontFamily.toLowerCase().replace(" ", "-");
        // @ts-expect-error -- wrong inference
        const data = await fetch(
          `https://fonts.bunny.net/${fontName}/files/${fontName}-latin-${element.fontWeight}-normal.woff`,
        ).then((response) => response.arrayBuffer());

        return {
          // @ts-expect-error -- wrong inference
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- wrong inference
          name: element.fontFamily,
          data,
          // @ts-expect-error -- wrong inference
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- wrong inference
          weight: element.fontWeight,
        };
      }),
  );
}
