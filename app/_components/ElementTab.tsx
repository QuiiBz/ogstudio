import { useSortable } from "@dnd-kit/sortable"
import { CSS } from '@dnd-kit/utilities';
import { useOg } from "./OgPlayground"
import { BoxIcon } from "./icons/BoxIcon"
import { CircleIcon } from "./icons/CircleIcon"
import { ImageIcon } from "./icons/ImageIcon"
import { MagicWandIcon } from "./icons/MagicWandIcon"
import { NotVisibleIcon } from "./icons/NotVisibleIcon"
import { TextIcon } from "./icons/TextIcon"
import { VisibleIcon } from "./icons/VisibleIcon"
import { OGElement } from "../_lib/types"

type ElementTabProps = {
  element: OGElement
}

export function ElementTab({ element }: ElementTabProps) {
  const { selectedElement, setSelectedElement, updateElement } = useOg()
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: element.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div className="flex justify-between items-center pb-2 cursor-auto" ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <button
        type="button"
        className={`flex gap-2 select-none text-gray-600 hover:text-gray-900 w-full ${selectedElement === element.id ? '!text-blue-500' : ''} ${!element.visible ? '!text-gray-300' : ''}`}
        onClick={() => setSelectedElement(element.id)}
      >
        {element.tag === 'p' ? (
          <>
            <TextIcon width="1.4em" height="1.4em" />
            {element.content.slice(0, 25)}
          </>
        ) : null}
        {element.tag === 'div' && element.backgroundImage ? (
          <>
            <ImageIcon width="1.4em" height="1.4em" />
            Image
          </>
        ) : null}
        {element.tag === 'div' && !element.backgroundImage && !element.radius ? (
          <>
            <BoxIcon width="1.4em" height="1.4em" />
            Box
          </>
        ) : null}
        {element.tag === 'div' && !element.backgroundImage && element.radius ? (
          <>
            <CircleIcon width="1.4em" height="1.4em" />
            Rounded box
          </>
        ) : null}
        {element.tag === 'span' ? (
          <>
            <MagicWandIcon width="1.4em" height="1.4em" />
            Dynamic text
          </>
        ) : null}
      </button>
      <button
        type="button"
        className="text-gray-600 hover:text-gray-900"
        onClick={() => updateElement({
          ...element,
          visible: !element.visible,
        })}
      >
        {element.visible ? <VisibleIcon /> : <NotVisibleIcon />}
      </button>
    </div>
  )
}
