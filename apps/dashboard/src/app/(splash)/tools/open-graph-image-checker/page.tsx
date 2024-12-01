import { type Metadata } from "next";
import { OpenGraphImageChecker } from "../../../../components/Splash/Tools/OpenGraphImageChecker";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Open Graph Image Checker - OG Studio",
  description: "Free tool to check Open Graph meta tags of any website.",
};

export default function Page() {
  return <OpenGraphImageChecker />;
}
