"use client";
import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Flex,
  Separator,
  Text,
} from "@radix-ui/themes";
import { usePathname } from "next/navigation";
import { OgEditor } from "../OgEditor";
import { GitHubIcon } from "../icons/GitHubIcon";
import { useUser } from "../../lib/hooks/useUser";
import { ImageIcon } from "../icons/ImageIcon";

interface OgSplashProps {
  children: ReactNode;
}

export function Splash({ children }: OgSplashProps) {
  const { data } = useUser();
  const largeSplash = usePathname() === "/tools/open-graph-image-checker";

  return (
    <>
      <OgEditor height={630} imageId="splash" width={1200} />
      <Flex
        align="center"
        className="z-10"
        height="100vh"
        justify="center"
        left="0"
        position="absolute"
        style={{ backgroundColor: "var(--color-overlay)" }}
        top="0"
        width="100vw"
      >
        <Box
          minHeight={largeSplash ? "740px" : "680px"}
          maxHeight="calc(100vh - 80px)"
          overflowY={{ initial: "scroll", md: "auto" }}
          overflowX="hidden"
          p="6"
          style={{
            boxShadow: "var(--shadow-6)",
            backgroundColor: "var(--color-panel-solid)",
            borderRadius: "var(--radius-5)",
          }}
          maxWidth="100vw"
          width={largeSplash ? "1160px" : "980px"}
        >
          <Flex
            justify="between"
            className="-mt-2 sm:mb-0 mb-4 gap-8 sm:items-center items-start"
          >
            <Flex
              align="center"
              className="flex-wrap gap-1 justify-between sm:gap-6 sm:justify-normal w-full"
            >
              <Text asChild size="6">
                <Link className="flex gap-2 items-center min-w-fit" href="/">
                  <Image
                    alt="OG Studio logo"
                    height={50}
                    src="/icon.png"
                    width={50}
                  />
                  Studio
                </Link>
              </Text>
              <Badge
                color="orange"
                radius="full"
                size="2"
                className="hidden md:block"
              >
                Early preview
              </Badge>
              <Button asChild color="gray" radius="full" variant="ghost">
                <Link href="https://github.com/QuiiBz/ogstudio" target="_blank">
                  <GitHubIcon />
                  GitHub
                </Link>
              </Button>
              <Button asChild color="gray" radius="full" variant="ghost">
                <Link href="/tools/open-graph-image-checker">
                  <ImageIcon />
                  Open Graph Checker
                </Link>
              </Button>
            </Flex>
            <Button
              asChild
              color="gray"
              mr="2"
              radius="full"
              variant="ghost"
              className="mt-2 sm:mt-[inherit]"
            >
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
          <Text as="p" className="lg:w-2/3" size="2">
            Create static or dynamic OG (Open Graph) images with an intuitive,
            Figma-like visual editor. Browse ready-to-use templates, and export
            your images to SVG/PNG or to a dynamic URL.
          </Text>
          <Separator className="opacity-50" my="6" size="4" />
          {children}
        </Box>
      </Flex>
    </>
  );
}
