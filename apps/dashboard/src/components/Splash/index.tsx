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
import { OgEditor } from "../OgEditor";
import { GitHubIcon } from "../icons/GitHubIcon";
import { useUser } from "../../lib/hooks/useUser";

interface OgSplashProps {
  children: ReactNode;
}

export function Splash({ children }: OgSplashProps) {
  const { data } = useUser();

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
          minHeight="678px"
          p="6"
          style={{
            boxShadow: "var(--shadow-6)",
            backgroundColor: "var(--color-panel-solid)",
            borderRadius: "var(--radius-5)",
          }}
          width="980px"
        >
          <Flex align="center" justify="between">
            <Flex align="center" className="-mt-2" gap="6">
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
                <Link href="https://github.com/QuiiBz/ogstudio" target="_blank">
                  <GitHubIcon />
                  GitHub
                </Link>
              </Button>
            </Flex>
            <Button asChild color="gray" mr="2" radius="full" variant="ghost">
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
          <Text as="p" className="w-2/3" size="2">
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
