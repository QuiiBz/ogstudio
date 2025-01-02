import { MyImagesSplash } from "../../../components/Splash/MyImagesSplash";

export const metadata = {
  title: "My Open Graph images - OG Studio",
  openGraph: {
    url: "https://ogstudio.app/my-images",
  },
};

export const dynamic = "force-static";

export default function MyImages() {
  return <MyImagesSplash />;
}
