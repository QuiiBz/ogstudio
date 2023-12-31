import type { SVGProps } from "react";

export function RotateIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      height="1em"
      viewBox="0 0 24 24"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M11.212 21q-1.664 0-3.119-.626q-1.455-.626-2.542-1.713t-1.713-2.543Q3.212 14.663 3.212 13q0-3.327 2.336-5.663Q7.885 5 11.212 5h1.303l-2.011-2.012l.708-.796L14.519 5.5l-3.307 3.308l-.708-.796L12.515 6h-1.303Q8.287 6 6.249 8.038T4.212 13q0 2.925 2.037 4.963T11.212 20q.875 0 1.725-.213t1.625-.637l.719.72q-.921.545-1.954.838T11.212 21Zm6-3.423L12.635 13l4.577-4.577L21.788 13l-4.576 4.577Z"
        fill="currentColor"
      />
    </svg>
  );
}
