import { Suspense } from "react";
import { OgSplash } from "../../components/OgSplash";

export const metadata = {
  title: 'My images - OG Studio',
  description: 'My Open Graph images.',
}

export default function MyImages() {
  return (
    // OgSplash uses `useSearchParams()` so we need to wrap it in a Suspense
    // to allow to statically render the page: https://nextjs.org/docs/app/building-your-application/rendering/server-components#dynamic-functions
    <Suspense>
      <OgSplash route="my-images" />
    </Suspense>
  )
}
