import type { SVGProps } from "react";

export function ExportIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      height="1em"
      viewBox="0 0 24 24"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M20 7.423v10.962q0 .69-.462 1.152q-.463.463-1.153.463H5.615q-.69 0-1.152-.462Q4 19.075 4 18.385V5.615q0-.69.463-1.152Q4.925 4 5.615 4h10.962L20 7.423Zm-1 .427L16.15 5H5.615q-.269 0-.442.173T5 5.615v12.77q0 .269.173.442t.442.173h12.77q.269 0 .442-.173t.173-.442V7.85Zm-7 8.688q.827 0 1.413-.586q.587-.587.587-1.414t-.587-1.413q-.586-.587-1.413-.587t-1.413.587Q10 13.712 10 14.538t.587 1.414q.586.586 1.413.586ZM6.77 9.77h7.422v-3H6.77v3ZM5 7.85V19V5v2.85Z"
        fill="currentColor"
      />
    </svg>
  );
}
