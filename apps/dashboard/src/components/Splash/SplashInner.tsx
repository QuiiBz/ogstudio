"use client";
import { type ReactNode, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { User } from "lucia";
import { OgEditor } from "../OgEditor";
import { CustomLink } from "../CustomLink";
import { GitHubIcon } from "../icons/GitHubIcon";
import { useImagesStore } from "../../stores/imagesStore";
import { useZoomStore } from "../../stores/zoomStore";

interface OgSplashProps {
  user: User | null;
  children: ReactNode;
}

export function SplashInner({ user, children }: OgSplashProps) {
  const searchParams = useSearchParams();
  const image = searchParams.get("i");
  // const { data } = useUser();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises -- we don't want to wait for this
    useImagesStore.persist.rehydrate();
    // eslint-disable-next-line @typescript-eslint/no-floating-promises -- we don't want to wait for this
    useZoomStore.persist.rehydrate();
  }, []);

  return (
    <>
      <OgEditor height={630} imageId={image ?? "splash"} width={1200} />
      {image ? null : (
        <div className="w-screen h-screen bg-black/10 flex justify-center items-center absolute top-0 left-0 z-10">
          <div className="p-8 rounded-md bg-white shadow-lg shadow-gray-200 w-[980px] h-[686px]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6 -mt-2">
                <Link
                  className="text-gray-900 text-2xl flex gap-2 items-center"
                  href="/"
                >
                  <Image
                    alt="OG Studio logo"
                    height={50}
                    src="/icon.png"
                    width={50}
                  />
                  Studio
                </Link>
                <span className="flex gap-2 items-center px-3 py-1 rounded-full text-white bg-yellow-500 select-none text-xs">
                  Early preview
                </span>
                <CustomLink
                  href="https://github.com/QuiiBz/ogstudio"
                  icon={<GitHubIcon />}
                  target="_blank"
                >
                  GitHub
                </CustomLink>
              </div>
              {user ? (
                <CustomLink
                  href="/profile"
                  icon={
                    <Image
                      alt={`${user.name}'s avatar`}
                      className="w-6 h-6 rounded-full"
                      height={24}
                      src={user.avatar}
                      width={24}
                    />
                  }
                  iconPosition="right"
                >
                  {user.name}
                </CustomLink>
              ) : (
                <CustomLink
                  href="/login"
                  icon={
                    <div className="w-6 h-6 rounded-full bg-gray-200 animate-pulse" />
                  }
                  iconPosition="right"
                >
                  Guest
                </CustomLink>
              )}
            </div>
            <p className="text-sm text-gray-600 w-2/3">
              Create static or dynamic Open Graph images with an intuitive,
              Figma-like visual editor. Browse ready-to-use templates, and
              export your images to SVG/PNG or to a dynamic URL.
            </p>
            <div className="h-[1px] w-full bg-gray-100 my-8" />
            {children}
          </div>
        </div>
      )}
    </>
  );
}
