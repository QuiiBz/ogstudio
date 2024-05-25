import type { MetadataRoute } from "next";
import { TEMPLATES, toTemplateSlug } from "../lib/templates";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://ogstudio.app",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://ogstudio.app/templates",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...TEMPLATES.map<MetadataRoute.Sitemap[number]>((template) => ({
      url: `https://ogstudio.app/templates/${encodeURIComponent(
        toTemplateSlug(template),
      )}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    })),
    {
      url: "https://ogstudio.app/my-images",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: "https://ogstudio.app/profile",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: "https://ogstudio.app/login",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];
}
