"use client";
import type { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Theme } from "@radix-ui/themes";

const queryClient = new QueryClient();

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Theme
        accentColor="blue"
        appearance="light"
        grayColor="slate"
        panelBackground="solid"
        radius="small"
        scaling="100%"
      >
        {children}
      </Theme>
    </QueryClientProvider>
  );
}
