import { Suspense, type ReactNode } from "react";
import { getSession } from "../../lib/auth/api";
import { SplashInner } from "./SplashInner";

interface OgSplashProps {
  children: ReactNode;
}

async function UserPill({ children }: OgSplashProps) {
  const data = await getSession();

  return <SplashInner user={data.user}>{children}</SplashInner>;
}

export function Splash({ children }: OgSplashProps) {
  return (
    // SplashInner uses `useSearchParams()` so we need to wrap it in a Suspense to allow to statically render the page
    // https://nextjs.org/docs/app/building-your-application/rendering/server-components#dynamic-functions
    <Suspense>
      <UserPill>{children}</UserPill>
    </Suspense>
  );
}
