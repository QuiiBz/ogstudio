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

export const WEIGHTS = {
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
} satisfies Record<typeof FONTS[number], number[]>
