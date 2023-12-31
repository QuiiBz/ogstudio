import type { SVGProps } from "react";

export function FontSizeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      height="1em"
      viewBox="0 0 24 24"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="m1.615 18.5l5.289-13h.961l5.289 13h-1.208l-1.448-3.633H4.194L2.746 18.5h-1.13Zm2.939-4.6h5.584l-2.71-6.8h-.132l-2.742 6.8Zm13.83 1.6v-3h-3v-1h3v-3h1v3h3v1h-3v3h-1Z"
        fill="currentColor"
      />
    </svg>
  );
}
