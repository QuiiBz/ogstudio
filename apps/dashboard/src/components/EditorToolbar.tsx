import type { ReactElement } from "react"
import type { OGElement } from "../lib/types"
import { createElement } from "../lib/elements"
import { TextIcon } from "./icons/TextIcon"
import { CircleIcon } from "./icons/CircleIcon"
import { ImageIcon } from "./icons/ImageIcon"
import { useOg } from "./OgEditor"
import { BoxIcon } from "./icons/BoxIcon"
import { MagicWandIcon } from "./icons/MagicWandIcon"

interface ToolbarButtonProps {
  element: Partial<OGElement>
  children: ReactElement
}

function ToolbarButton({ element, children }: ToolbarButtonProps) {
  const { addElement } = useOg()

  return (
    <button className="p-2 text-gray-600 hover:text-gray-900" onClick={() => { addElement(createElement(element)); }} type="button">
      {children}
    </button>
  )
}

export function EditorToolbar() {
  return (
    <div className="rounded-md border border-gray-100 bg-white z-10 flex flex-row items-center">
      <ToolbarButton element={{
        tag: 'p',
        name: 'Text',
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
        letterSpacing: 0,
        fontSize: 50,
        align: 'left',
      }}>
        <TextIcon height="1.4em" width="1.4em" />
      </ToolbarButton>
      <div className="w-[1px] h-4 bg-gray-100" />
      <ToolbarButton element={{
        tag: 'div',
        name: 'Box',
        width: 200,
        height: 200,
        visible: true,
        rotate: 0,
        opacity: 100,
        backgroundColor: '#000000',
      }}>
        <BoxIcon height="1.4em" width="1.4em" />
      </ToolbarButton>
      <div className="w-[1px] h-4 bg-gray-100" />
      <ToolbarButton element={{
        tag: 'div',
        name: 'Rounded box',
        width: 150,
        height: 150,
        visible: true,
        rotate: 0,
        opacity: 100,
        backgroundColor: '#000000',
        radius: 999,
      }}>
        <CircleIcon height="1.4em" width="1.4em" />
      </ToolbarButton>
      <div className="w-[1px] h-4 bg-gray-100" />
      <ToolbarButton element={{
        tag: 'div',
        name: 'Image',
        width: 200,
        height: 150,
        visible: true,
        rotate: 0,
        opacity: 100,
        backgroundColor: '#000000',
        backgroundImage: 'https://source.unsplash.com/random',
        backgroundSize: 'cover',
      }}>
        <ImageIcon height="1.4em" width="1.4em" />
      </ToolbarButton>
      <div className="w-[1px] h-4 bg-gray-100" />
      <ToolbarButton element={{
        tag: 'span',
        name: 'Dynamic text',
        width: 312,
        height: 50,
        visible: true,
        rotate: 0,
        opacity: 100,
        color: '#000000',
        fontFamily: 'Inter',
        fontWeight: 400,
        lineHeight: 1,
        letterSpacing: 0,
        fontSize: 50,
        align: 'left',
      }}>
        <MagicWandIcon height="1.4em" width="1.4em" />
      </ToolbarButton>
    </div>
  )
}