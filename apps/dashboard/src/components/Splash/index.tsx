"use client";
import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { Avatar, Box, Button, Flex, Text } from "@radix-ui/themes";
import { usePathname } from "next/navigation";
import { OgEditor } from "../OgEditor";
import { GitHubIcon } from "../icons/GitHubIcon";
import { useUser } from "../../lib/hooks/useUser";
import { useIsSignedIn } from "../../lib/hooks/useIsSignedIn";

interface OgSplashProps {
  children: ReactNode;
}

export function Splash({ children }: OgSplashProps) {
  const { data } = useUser();
  const isSignedIn = useIsSignedIn();
  const pathname = usePathname();

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
          height="800px"
          maxHeight="calc(100vh - 40px)"
          width="1160px"
          maxWidth="calc(100vw - 20px)"
          overflowY={{ initial: "scroll", md: "auto" }}
          overflowX="hidden"
          p="6"
          style={{
            boxShadow: "var(--shadow-6)",
            backgroundColor: "var(--color-panel-solid)",
            borderRadius: "var(--radius-5)",
          }}
        >
          <Flex
            justify="between"
            mt="-3"
            className="sm:items-center items-start"
          >
            <Flex align="center" gap="6">
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
              <Button
                asChild
                color="gray"
                radius="full"
                variant="ghost"
                highContrast={pathname.startsWith("/templates")}
              >
                <Link href="/templates">Templates</Link>
              </Button>
              <Button
                asChild
                color="gray"
                radius="full"
                variant="ghost"
                highContrast={pathname === "/tools/open-graph-image-checker"}
              >
                <Link href="/tools/open-graph-image-checker">
                  Open Graph Checker
                </Link>
              </Button>
            </Flex>
            <Flex align="center" gap="6">
              <Button asChild color="gray" radius="full" variant="ghost">
                <Link href="https://github.com/QuiiBz/ogstudio" target="_blank">
                  <GitHubIcon />
                  GitHub
                </Link>
              </Button>
              <Button
                asChild
                color="gray"
                radius="full"
                variant="ghost"
                highContrast={pathname === "/profile" || pathname === "/login"}
              >
                <Link href={isSignedIn ? "/profile" : "/login"}>
                  <Avatar
                    fallback="G"
                    radius="full"
                    size="1"
                    src={isSignedIn ? data?.session.user?.avatar : undefined}
                    ml="-1"
                  />
                  {isSignedIn ? data?.session.user?.name : "Guest"}
                </Link>
              </Button>
            </Flex>
          </Flex>
          {/* <Text as="p" className="lg:w-2/3" size="2"> */}
          {/*   Create static or dynamic OG (Open Graph) images with an intuitive, */}
          {/*   Figma-like visual editor. Browse ready-to-use templates, and export */}
          {/*   your images to SVG/PNG or to a dynamic URL. */}
          {/* </Text> */}
          {/* <Separator className="opacity-50" my="6" size="4" /> */}
          {children}
        </Box>
      </Flex>
    </>
  );
}
