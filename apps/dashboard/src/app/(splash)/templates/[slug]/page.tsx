import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TemplateSplash } from "../../../../components/Splash/TemplateSplash";
import { TEMPLATES, toTemplateSlug } from "../../../../lib/templates";

interface TemplateProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return TEMPLATES.map((template) => ({ slug: toTemplateSlug(template) }));
}

export async function generateMetadata({
  params,
}: TemplateProps): Promise<Metadata> {
  const { slug } = await params;

  const decodedSlug = decodeURIComponent(slug);
  const template = TEMPLATES.find(
    (current) => toTemplateSlug(current) === decodedSlug,
  );

  if (!template) {
    return {
      title: "404 - OG Studio",
      description: "This page could not be found.",
    };
  }

  return {
    title: `${template.name} template - OG Studio`,
    description: `${template.description} Edit this free template in an intuitive, Figma-like visual editor, and export it to SVG/PNG or to a dynamic URL.`,
    openGraph: {
      siteName: "OG Studio",
      images: `https://ogstudio.app/api/og/template/${toTemplateSlug(template)}`,
      type: "website",
      url: `https://ogstudio.app/templates/${toTemplateSlug(template)}`,
    },
  };
}

export const dynamic = "force-static";

export default async function Template({ params }: TemplateProps) {
  const { slug } = await params;

  const decodedSlug = decodeURIComponent(slug);
  const template = TEMPLATES.find(
    (current) => toTemplateSlug(current) === decodedSlug,
  );

  if (!template) {
    notFound();
  }

  return <TemplateSplash template={template} />;
}
