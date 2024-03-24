"use client";
import { Suspense, type ReactNode, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Avatar, Badge, Button, Flex, Separator, Text } from "@radix-ui/themes";
import { OgEditor } from "../OgEditor";
import { GitHubIcon } from "../icons/GitHubIcon";
import { useImagesStore } from "../../stores/imagesStore";
import { useZoomStore } from "../../stores/zoomStore";
import { useUser } from "../../lib/hooks/useUser";

interface OgSplashProps {
  children: ReactNode;
}

function SplashInner({ children }: OgSplashProps) {
  const searchParams = useSearchParams();
  const image = searchParams.get("i");
  const { data } = useUser();

  useEffect(() => {
    void useImagesStore.persist.rehydrate();
    void useZoomStore.persist.rehydrate();
  }, []);

  return (
    <>
      <OgEditor height={630} imageId={image ?? "splash"} width={1200} />
      {image ? null : (
        <div className="w-screen h-screen bg-black/10 flex justify-center items-center absolute top-0 left-0 z-10">
          <div className="p-8 rounded-md bg-white shadow-lg shadow-gray-200 w-[980px]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6 -mt-2">
                <Text asChild size="6">
                  <Link className="flex gap-2 items-center" href="/">
                    <Image
                      alt="OG Studio logo"
                      height={50}
                      src="/icon.png"
                      width={50}
                    />
                    Studio
                  </Link>
                </Text>
                <Badge color="orange" radius="full" size="2">
                  Early preview
                </Badge>
                <Button asChild color="gray" radius="full" variant="ghost">
                  <Link
                    href="https://github.com/QuiiBz/ogstudio"
                    target="_blank"
                  >
                    <GitHubIcon />
                    GitHub
                  </Link>
                </Button>
              </div>
              <Flex align="center" justify="between" mx="2">
                <Button asChild color="gray" radius="full" variant="ghost">
                  <Link href={data?.user ? "/profile" : "/login"}>
                    {data?.user?.name ?? "Guest"}
                    <Avatar
                      fallback="G"
                      radius="full"
                      size="1"
                      src={data?.user?.avatar}
                    />
                  </Link>
                </Button>
              </Flex>
            </div>
            <Text as="p" className="w-2/3" size="2">
              Create static or dynamic Open Graph images with an intuitive,
              Figma-like visual editor. Browse ready-to-use templates, and
              export your images to SVG/PNG or to a dynamic URL.
            </Text>
            <Separator className="opacity-50" my="6" size="4" />
            {children}
          </div>
        </div>
      )}
    </>
  );
}

export function Splash({ children }: OgSplashProps) {
  return (
    // SplashInner uses `useSearchParams()` so we need to wrap it in a Suspense to allow to statically render the page
    // https://nextjs.org/docs/app/building-your-application/rendering/server-components#dynamic-functions
    <Suspense>
      <SplashInner>{children}</SplashInner>
    </Suspense>
  );
}
