"use client";
import * as RadixTooltip from "@radix-ui/react-tooltip";
import type { ReactNode } from "react";

export const TooltipProvider = RadixTooltip.Provider;

interface TooltipProps {
  content?: ReactNode;
  children: ReactNode;
}

export function Tooltip({ content, children }: TooltipProps) {
  if (!content) {
    return children;
  }

  return (
    <RadixTooltip.Root delayDuration={200}>
      <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
      <RadixTooltip.Content
        className="bg-gray-900 py-1 px-2 rounded text-sm text-white"
        sideOffset={4}
      >
        {content}
        <RadixTooltip.Arrow className="fill-gray-900" />
      </RadixTooltip.Content>
    </RadixTooltip.Root>
  );
}
