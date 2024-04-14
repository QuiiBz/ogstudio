import type { Metadata } from "next";
import { TemplateSplash } from "../../../../components/Splash/TemplateSplash";
import { TEMPLATES } from "../../../../lib/templates";

interface TemplateProps {
  params: {
    name: string;
  };
}

export function generateStaticParams() {
  return TEMPLATES.map((template) => template.name.toLowerCase());
}

export function generateMetadata({
  params: { name },
}: TemplateProps): Metadata {
  const decodedName = decodeURIComponent(name);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- We know the template exists
  const template = TEMPLATES.find(
    (current) => current.name.toLowerCase() === decodedName,
  )!;

  return {
    title: `${template.name} template - OG Studio`,
    description: template.description,
    openGraph: {
      images: `https://ogstudio.app/api/og/MWI5enZ0YmJ6M3A2c3hzOnlkN21nNDl5eA==?title=${encodeURI(
        `${template.name} template`,
      )}&description=${encodeURI(template.description)}&image=${encodeURI(
        `https://ogstudio.app/api/og/template/${template.name.toLowerCase()}`,
      )}`,
    },
  };
}

export const dynamic = "force-static";

export default function Template({ params: { name } }: TemplateProps) {
  const decodedName = decodeURIComponent(name);
  const template = TEMPLATES.find(
    (current) => current.name.toLowerCase() === decodedName,
  );

  if (!template) {
    return null;
  }

  return <TemplateSplash template={template} />;
}
