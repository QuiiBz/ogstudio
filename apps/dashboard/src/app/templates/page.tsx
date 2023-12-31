import { TemplatesSplash } from "../../components/Splash/TemplatesSplash";

export const metadata = {
  title: "Templates - OG Studio",
  description: "Pre-made Open Graph image templates.",
};

export const dynamic = "force-static";

export default function Templates() {
  return <TemplatesSplash />;
}
