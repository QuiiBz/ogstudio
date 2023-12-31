import type { SVGProps } from "react";

export function UndoIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      height="1em"
      viewBox="0 0 24 24"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M7.404 18v-1h7.254q1.555 0 2.65-1.067q1.096-1.068 1.096-2.606t-1.095-2.596q-1.096-1.058-2.651-1.058H6.915l2.966 2.965l-.708.708L5 9.173L9.173 5l.708.708l-2.966 2.965h7.743q1.963 0 3.355 1.354q1.39 1.354 1.39 3.3t-1.39 3.31Q16.62 18 14.657 18H7.404Z"
        fill="currentColor"
      />
    </svg>
  );
}
