export const FONTS = [
  'Roboto',
  'Open Sans',
  'Montserrat',
  'Lato',
  'Poppins',
  'Inter',
  'Oswald',
  'Raleway',
  'Nunito',
  'Ubuntu',
] as const

export type Font = typeof FONTS[number]

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
} satisfies Record<Font, number[]>

/**
 * Try to load a font from Bunny Fonts, if the font is not already loaded.
 * The font is loaded asynchronously, so it may not be available immediately
 * and the caller should make sure to wait for the font to be loaded before
 * using it.
 */
export function maybeLoadFont(font: string, weight: number) {
  const id = `font-${font}-${weight}`

  if (document.getElementById(id)) {
    return
  }

  const link = document.createElement('link')
  link.id = id
  link.rel = 'stylesheet'
  link.href = `https://fonts.bunny.net/css?family=${font.toLowerCase().replace(' ', '-')}:${weight}`
  document.head.appendChild(link)
}

