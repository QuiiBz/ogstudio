export const META_TAGS = {
  "og:title": "The title of your object as it should appear within the graph.",
  "og:description": "A one to two sentence description of your object.",
  "og:site_name": "The name which should be displayed for the overall site.",
  "og:url":
    "The canonical URL of your object that will be used as its permanent ID in the graph.",
  "og:image":
    "An image URL which should represent your object within the graph.",
} as const;

export const META_KEYS = Object.keys(META_TAGS) as MetaTags[];

export type MetaTags = keyof typeof META_TAGS;
