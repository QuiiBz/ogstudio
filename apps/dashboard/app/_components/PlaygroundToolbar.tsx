import { ReactElement } from "react"
import { OGElement } from "../_lib/types"
import { TextIcon } from "./icons/TextIcon"
import { CircleIcon } from "./icons/CircleIcon"
import { ImageIcon } from "./icons/ImageIcon"
import { useOg } from "./OgPlayground"
import { BoxIcon } from "./icons/BoxIcon"
import { MagicWandIcon } from "./icons/MagicWandIcon"

type ToolbarButtonProps = {
  element: OGElement
  children: ReactElement
}

function ToolbarButton({ element, children }: ToolbarButtonProps) {
  const { addElement } = useOg()

  return (
    <button type="button" className="p-2 text-gray-600 hover:text-gray-900" onClick={() => addElement(element)}>
      {children}
    </button>
  )
}

export function PlaygroundToolbar() {
  return (
    <div className="rounded-md border border-gray-100 bg-white z-10 flex flex-row items-center">
      <ToolbarButton element={{
        tag: 'p',
        id: String(Math.random()),
        x: (1200 - 100) / 2,
        y: (630 - 50) / 2,
        width: 100,
        height: 50,
        visible: true,
        rotate: 0,
        opacity: 100,
        content: 'Text',
        color: '#000000',
        fontFamily: 'Inter',
        fontWeight: 400,
        lineHeight: 1,
        fontSize: 50,
        align: 'left',
      }}>
        <TextIcon width="1.4em" height="1.4em" />
      </ToolbarButton>
      <div className="w-[1px] h-4 bg-gray-100" />
      <ToolbarButton element={{
        tag: 'div',
        id: String(Math.random()),
        x: (1200 - 200) / 2,
        y: (630 - 200) / 2,
        width: 200,
        height: 200,
        visible: true,
        rotate: 0,
        opacity: 100,
        backgroundColor: '#000000',
      }}>
        <BoxIcon width="1.4em" height="1.4em" />
      </ToolbarButton>
      <div className="w-[1px] h-4 bg-gray-100" />
      <ToolbarButton element={{
        tag: 'div',
        id: String(Math.random()),
        x: (1200 - 150) / 2,
        y: (630 - 150) / 2,
        width: 150,
        height: 150,
        visible: true,
        rotate: 0,
        opacity: 100,
        backgroundColor: '#000000',
        radius: 999,
      }}>
        <CircleIcon width="1.4em" height="1.4em" />
      </ToolbarButton>
      <div className="w-[1px] h-4 bg-gray-100" />
      <ToolbarButton element={{
        tag: 'div',
        id: String(Math.random()),
        x: (1200 - 200) / 2,
        y: (630 - 150) / 2,
        width: 200,
        height: 150,
        visible: true,
        rotate: 0,
        opacity: 100,
        backgroundColor: '#000000',
        backgroundImage: 'https://source.unsplash.com/random',
        backgroundSize: 'cover',
      }}>
        <ImageIcon width="1.4em" height="1.4em" />
      </ToolbarButton>
      <div className="w-[1px] h-4 bg-gray-100" />
      <ToolbarButton element={{
        tag: 'span',
        id: String(Math.random()),
        x: (1200 - 312) / 2,
        y: (630 - 50) / 2,
        width: 312,
        height: 50,
        visible: true,
        rotate: 0,
        opacity: 100,
        color: '#000000',
        fontFamily: 'Inter',
        fontWeight: 400,
        lineHeight: 1,
        fontSize: 50,
        align: 'left',
      }}>
        <MagicWandIcon width="1.4em" height="1.4em" />
      </ToolbarButton>
    </div>
  )
}
