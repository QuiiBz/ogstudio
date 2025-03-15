import { TemplatesSplash } from "../../../components/Splash/TemplatesSplash";

export const metadata = {
  title: "Templates - OG Studio",
  description:
    "Free, pre-made Open Graph image templates. Create static or dynamic OG (Open Graph) images with an intuitive, Figma-like visual editor.",
  openGraph: {
    siteName: "OG Studio",
    images:
      "https://github.com/QuiiBz/ogstudio/blob/main/assets/builder.jpeg?raw=true",
    type: "website",
    url: "https://ogstudio.app/templates",
  },
};

export const dynamic = "force-static";

export default function Templates() {
  return <TemplatesSplash />;
}
