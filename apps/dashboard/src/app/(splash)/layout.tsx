import type { ReactNode } from "react";
import { Splash } from "../../components/Splash";

export default function SplashLayout({ children }: { children: ReactNode }) {
  return <Splash>{children}</Splash>;
}
