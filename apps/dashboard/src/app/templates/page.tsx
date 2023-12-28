import { Suspense } from "react";
import { OgSplash } from "../../components/OgSplash";

export const metadata = {
  title: 'Templates - OG Studio',
  description: 'Pre-made Open Graph image templates.',
}

export default function Templates() {
  return (
    // OgSplash uses `useSearchParams()` so we need to wrap it in a Suspense
    // to allow to statically render the page: https://nextjs.org/docs/app/building-your-application/rendering/server-components#dynamic-functions
    <Suspense>
      <OgSplash route="templates" />
    </Suspense>
  )
}
