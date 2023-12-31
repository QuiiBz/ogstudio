import type { SVGProps } from "react";

export function CopyIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      height="1em"
      viewBox="0 0 24 24"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M9.115 17q-.69 0-1.152-.462q-.463-.463-.463-1.153V4.615q0-.69.463-1.152Q8.425 3 9.115 3h7.77q.69 0 1.152.463q.463.462.463 1.152v10.77q0 .69-.462 1.153q-.463.462-1.153.462zm0-1h7.77q.23 0 .423-.192q.192-.193.192-.423V4.615q0-.23-.192-.423Q17.115 4 16.885 4h-7.77q-.23 0-.423.192q-.192.193-.192.423v10.77q0 .23.192.423q.193.192.423.192m-3 4q-.69 0-1.152-.462q-.463-.463-.463-1.153V6.615h1v11.77q0 .23.192.423q.193.192.423.192h8.77v1zM8.5 16V4z"
        fill="currentColor"
      />
    </svg>
  );
}
