"use client";
import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Avatar,
  Box,
  Button,
  DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes";
import { usePathname } from "next/navigation";
import { OgEditor } from "../OgEditor";
import { GitHubIcon } from "../icons/GitHubIcon";
import { useUser } from "../../lib/hooks/useUser";
import { useIsSignedIn } from "../../lib/hooks/useIsSignedIn";
import { MenuIcon } from "../icons/MenuIcon";

function ProfileButton() {
  const { data } = useUser();
  const isSignedIn = useIsSignedIn();
  const pathname = usePathname();

  return (
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
  );
}

interface OgSplashProps {
  children: ReactNode;
}

export function Splash({ children }: OgSplashProps) {
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
          <Flex justify="between" align="center" mt="-3">
            <Flex align="center" gap="6">
              <Text asChild size="5" className="font-[Raleway]" weight="medium">
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
                className="hidden sm:inline-flex"
              >
                <Link href="/templates">Templates</Link>
              </Button>
              <Button
                asChild
                color="gray"
                radius="full"
                variant="ghost"
                highContrast={pathname === "/tools/open-graph-image-checker"}
                className="hidden sm:inline-flex"
              >
                <Link href="/tools/open-graph-image-checker">
                  Open Graph Checker
                </Link>
              </Button>
            </Flex>
            <Flex align="center" gap="6" className="hidden sm:flex">
              <Button asChild color="gray" radius="full" variant="ghost">
                <Link href="https://github.com/QuiiBz/ogstudio" target="_blank">
                  <GitHubIcon />
                  GitHub
                </Link>
              </Button>
              <ProfileButton />
            </Flex>
            <DropdownMenu.Root>
              <DropdownMenu.Trigger className="sm:hidden">
                <MenuIcon />
              </DropdownMenu.Trigger>
              <DropdownMenu.Content variant="soft" className="sm:hidden">
                <DropdownMenu.Item asChild>
                  <Link href="/templates">Templates</Link>
                </DropdownMenu.Item>
                <DropdownMenu.Item asChild>
                  <Link href="/tools/open-graph-image-checker">
                    Open Graph Checker
                  </Link>
                </DropdownMenu.Item>
                <DropdownMenu.Item asChild>
                  <Link
                    href="https://github.com/QuiiBz/ogstudio"
                    target="_blank"
                  >
                    <GitHubIcon />
                    GitHub
                  </Link>
                </DropdownMenu.Item>
                <DropdownMenu.Separator />
                <DropdownMenu.Item>
                  <ProfileButton />
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          </Flex>
          {children}
        </Box>
      </Flex>
    </>
  );
}
