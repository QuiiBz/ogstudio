"use client";
import { useEffect, type ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Theme } from "@radix-ui/themes";
import { ThemeProvider } from "next-themes";
import { useImagesStore } from "../stores/imagesStore";
import { useZoomStore } from "../stores/zoomStore";

const queryClient = new QueryClient();

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  useEffect(() => {
    void useImagesStore.persist.rehydrate();
    void useZoomStore.persist.rehydrate();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class">
        <Theme
          accentColor="indigo"
          grayColor="slate"
          panelBackground="solid"
          radius="small"
          scaling="100%"
        >
          {children}
        </Theme>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
