import { MyImagesSplash } from "../../../components/Splash/MyImagesSplash";

export const metadata = {
  title: "My Open Graph images - OG Studio",
  openGraph: {
    siteName: "OG Studio",
    images:
      "https://github.com/QuiiBz/ogstudio/blob/main/assets/builder.jpeg?raw=true",
    type: "website",
    url: "https://ogstudio.app/my-images",
  },
};

export const dynamic = "force-static";

export default function MyImages() {
  return <MyImagesSplash />;
}
