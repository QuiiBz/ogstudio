import type { ReactElement } from "react"
import { createElement } from "../lib/elements"
import { TextIcon } from "./icons/TextIcon"
import { CircleIcon } from "./icons/CircleIcon"
import { ImageIcon } from "./icons/ImageIcon"
import { useOg } from "./OgEditor"
import { BoxIcon } from "./icons/BoxIcon"
import { MagicWandIcon } from "./icons/MagicWandIcon"
import { ZoomOutIcon } from "./icons/ZoomOutIcon"
import { ZoomInIcon } from "./icons/ZoomInIcon"

interface ToolbarButtonProps {
  onClick: () => void
  children: ReactElement
}

function ToolbarButton({ onClick, children }: ToolbarButtonProps) {
  return (
    <button className="p-2 text-gray-600 hover:text-gray-900" onClick={onClick} type="button">
      {children}
    </button>
  )
}

export function EditorToolbar() {
  const { addElement, zoom, setZoom } = useOg()

  function zoomIn() {
    if (zoom >= 100) return

    setZoom(zoom + 10)
  }

  function zoomOut() {
    if (zoom <= 10) return

    setZoom(zoom - 10)
  }

  return (
    <div className="flex flex-row items-center z-10 gap-4">
      <div className="rounded-md border border-gray-100 bg-white flex flex-row items-center">
        <ToolbarButton onClick={() => {
          addElement(createElement({
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
            fontSize: 50,
            align: 'left',
          }));
        }}>
          <TextIcon height="1.4em" width="1.4em" />
        </ToolbarButton>
        <div className="w-[1px] h-4 bg-gray-100" />
        <ToolbarButton onClick={() => {
          addElement(createElement({
            tag: 'div',
            name: 'Box',
            width: 200,
            height: 200,
            visible: true,
            rotate: 0,
            opacity: 100,
            backgroundColor: '#000000',
          }));
        }}>
          <BoxIcon height="1.4em" width="1.4em" />
        </ToolbarButton>
        <div className="w-[1px] h-4 bg-gray-100" />
        <ToolbarButton onClick={() => {
          addElement(createElement({
            tag: 'div',
            name: 'Rounded box',
            width: 150,
            height: 150,
            visible: true,
            rotate: 0,
            opacity: 100,
            backgroundColor: '#000000',
            radius: 999,
          }));
        }}>
          <CircleIcon height="1.4em" width="1.4em" />
        </ToolbarButton>
        <div className="w-[1px] h-4 bg-gray-100" />
        <ToolbarButton onClick={() => {
          addElement(createElement({
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
          }));
        }}>
          <ImageIcon height="1.4em" width="1.4em" />
        </ToolbarButton>
        <div className="w-[1px] h-4 bg-gray-100" />
        <ToolbarButton onClick={() => {
          addElement(createElement({
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
            fontSize: 50,
            align: 'left',
          }))
        }}>
          <MagicWandIcon height="1.4em" width="1.4em" />
        </ToolbarButton>
      </div>
      <div className="rounded-md border border-gray-100 bg-white flex flex-row items-center">
        <ToolbarButton onClick={() => { zoomOut() }}>
          <ZoomOutIcon />
        </ToolbarButton>
        <div className="w-[1px] h-4 bg-gray-100" />
        {/* Set absolute width to make sure it doesn't change the layout */}
        <span className="text-xs w-[46px] text-center text-gray-600">{zoom}%</span>
        <div className="w-[1px] h-4 bg-gray-100" />
        <ToolbarButton onClick={() => { zoomIn() }}>
          <ZoomInIcon />
        </ToolbarButton>
      </div>
    </div >
  )
}
