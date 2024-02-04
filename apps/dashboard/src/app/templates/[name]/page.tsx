import { TemplateSplash } from "../../../components/Splash/TemplateSplash";
import { TEMPLATES } from "../../../lib/templates";

interface TemplateProps {
  params: {
    name: string;
  };
}

export function generateStaticParams() {
  return TEMPLATES.map((template) => template.name.toLowerCase());
}

export function generateMetadata({ params: { name } }: TemplateProps) {
  const decodedName = decodeURIComponent(name);
  const template = TEMPLATES.find(
    (current) => current.name.toLowerCase() === decodedName,
  );

  return {
    title: `${template?.name} template - OG Studio`,
    description: "Pre-made Open Graph image templates.",
  };
}

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
