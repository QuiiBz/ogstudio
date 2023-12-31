import type { SVGProps } from "react";

export function LineHeightIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      height="1em"
      viewBox="0 0 24 24"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M3 21v-1.23h18V21H3Zm4.5-8v-2h9v2h-9ZM3 4.23V3h18v1.23H3Z"
        fill="currentColor"
      />
    </svg>
  );
}
