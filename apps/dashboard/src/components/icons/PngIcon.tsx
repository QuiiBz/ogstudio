import type { SVGProps } from "react";

export function PngIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      height="1em"
      viewBox="0 0 256 256"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M60 148H44a4 4 0 0 0-4 4v56a4 4 0 0 0 8 0v-12h12a24 24 0 0 0 0-48m0 40H48v-32h12a16 16 0 0 1 0 32m160 12.87a4 4 0 0 1-1.11 2.77A26.11 26.11 0 0 1 200 212c-15.44 0-28-14.36-28-32s12.56-32 28-32a25.41 25.41 0 0 1 14.24 4.43a4 4 0 1 1-4.48 6.63A17.45 17.45 0 0 0 200 156c-11 0-20 10.77-20 24s9 24 20 24a17.87 17.87 0 0 0 12-4.82V188h-4a4 4 0 0 1 0-8h8a4 4 0 0 1 4 4ZM152 152v56a4 4 0 0 1-2.78 3.81a3.93 3.93 0 0 1-1.22.19a4 4 0 0 1-3.25-1.67L112 164.48V208a4 4 0 0 1-8 0v-56a4 4 0 0 1 7.25-2.33L144 195.52V152a4 4 0 0 1 8 0m52-40a4 4 0 0 0 8 0V88a4 4 0 0 0-1.17-2.83l-56-56A4 4 0 0 0 152 28H56a12 12 0 0 0-12 12v72a4 4 0 0 0 8 0V40a4 4 0 0 1 4-4h92v52a4 4 0 0 0 4 4h52Zm-48-28V41.65L198.34 84Z"
        fill="currentColor"
      />
    </svg>
  );
}
