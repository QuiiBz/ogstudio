import { SVGProps } from "react";

export function VisibleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}><path fill="currentColor" d="M12.005 15.154q1.524 0 2.586-1.067t1.063-2.592q0-1.524-1.067-2.586t-2.592-1.063q-1.524 0-2.586 1.067t-1.063 2.592q0 1.524 1.067 2.586t2.592 1.063ZM12 14.2q-1.125 0-1.912-.787T9.3 11.5q0-1.125.788-1.912T12 8.8q1.125 0 1.913.788T14.7 11.5q0 1.125-.787 1.913T12 14.2Zm.003 3.8q-3.25 0-5.922-1.768q-2.673-1.769-4.004-4.732q1.33-2.963 4.001-4.732Q8.748 5 11.998 5q3.248 0 5.921 1.768q2.673 1.769 4.004 4.732q-1.33 2.963-4.001 4.732Q15.252 18 12.002 18ZM12 11.5Zm0 5.5q2.825 0 5.188-1.487T20.8 11.5q-1.25-2.525-3.613-4.012T12 6Q9.175 6 6.813 7.488T3.2 11.5q1.25 2.525 3.613 4.013T12 17Z"></path></svg>
  )
}
