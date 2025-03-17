import { type Metadata } from "next";
import { Profile } from "../../../components/Profile";

export const metadata: Metadata = {
  title: "My profile - OG Studio",
  openGraph: {
    siteName: "OG Studio",
    images:
      "https://github.com/QuiiBz/ogstudio/blob/main/assets/builder.jpeg?raw=true",
    type: "profile",
    url: "https://ogstudio.app/profile",
  },
};

export const dynamic = "force-static";

export default function Page() {
  return <Profile />;
}
