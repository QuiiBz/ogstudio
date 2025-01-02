import { type Metadata } from "next";
import { Profile } from "../../../components/Profile";

export const metadata: Metadata = {
  title: "Profile - OG Studio",
  openGraph: {
    type: "profile",
  },
};

export const dynamic = "force-static";

export default function Page() {
  return <Profile />;
}
