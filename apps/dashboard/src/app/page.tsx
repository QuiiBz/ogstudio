import { Suspense } from "react";
import { OgSplash } from "../components/OgSplash";

export default function Home() {
  return (
    <Suspense>
      <OgSplash />
    </Suspense>
  )
}
