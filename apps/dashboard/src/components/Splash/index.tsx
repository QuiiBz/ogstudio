import { Suspense, type ReactNode } from "react";
import Image from "next/image";
import { CustomLink } from "../CustomLink";
import { getSession } from "../../lib/auth/api";
import { SplashInner } from "./SplashInner";

interface OgSplashProps {
  children: ReactNode;
}

function UserPillFallback() {
  return (
    <CustomLink
      href="/login"
      icon={<div className="w-6 h-6 rounded-full bg-gray-200 animate-pulse" />}
      iconPosition="right"
    >
      Guest
    </CustomLink>
  );
}

async function UserPill() {
  const data = await getSession();

  if (!data.user) {
    return <UserPillFallback />;
  }

  return (
    <CustomLink
      href="/profile"
      icon={
        <Image
          alt={`${data.user.name}'s avatar`}
          className="w-6 h-6 rounded-full"
          height={24}
          src={data.user.avatar}
          width={24}
        />
      }
      iconPosition="right"
    >
      {data.user.name}
    </CustomLink>
  );
}

export function Splash({ children }: OgSplashProps) {
  return (
    // SplashInner uses `useSearchParams()` so we need to wrap it in a Suspense to allow to statically render the page
    // https://nextjs.org/docs/app/building-your-application/rendering/server-components#dynamic-functions
    <Suspense>
      <SplashInner
        userPill={
          <Suspense fallback={<UserPillFallback />}>
            <UserPill />
          </Suspense>
        }
      >
        {children}
      </SplashInner>
    </Suspense>
  );
}
